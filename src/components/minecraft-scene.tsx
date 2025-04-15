'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3 } from 'three'

// Define section type for type safety
type SectionType = 'main' | 'about' | 'projects' | 'skills' | 'contact';

// Isometric camera position for interior view
const isometricView = {
  position: new Vector3(9.16, 2.78, 0.95), // Updated default camera position
  target: new Vector3(0, 0, 0),   // Looking at the center of the room
}

// Camera positions for different sections (all showing interior)
const cameraPositions: Record<SectionType, { position: Vector3, target: Vector3 }> = {
  main: { position: new Vector3(9.16, 2.78, 0.95), target: new Vector3(0, 0, 0) },
  about: { position: new Vector3(1.78, 1.6, 1.71), target: new Vector3(1.05, 1.31, 1.1) },
  projects: { position: new Vector3(1.25, 1.28, -0.75), target: new Vector3(0.25, 1.19, -0.18) },
  skills: { position: new Vector3(2.72, 1.1, 0), target: new Vector3(1.33, 1.15, 0.92) },
  contact: { position: new Vector3(1.25, 2.43, 0.78), target: new Vector3(1.33, 1.15, 0.92) },
}

// Type for camera position state
type CameraPositionState = {
  camera: { x: number; y: number; z: number; };
  target: { x: number; y: number; z: number; };
};

// Camera position state updater component
const CameraPositionUpdater = ({ setCameraState }: { setCameraState: (state: CameraPositionState) => void }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useFrame(() => {
    const cameraPos = {
      x: Math.round(camera.position.x * 100) / 100,
      y: Math.round(camera.position.y * 100) / 100,
      z: Math.round(camera.position.z * 100) / 100
    };
    
    let targetPos = { x: 0, y: 0, z: 0 };
    
    // Get target from controls if available
    if (controlsRef.current && controlsRef.current.target) {
      targetPos = {
        x: Math.round(controlsRef.current.target.x * 100) / 100,
        y: Math.round(controlsRef.current.target.y * 100) / 100,
        z: Math.round(controlsRef.current.target.z * 100) / 100
      };
    }
    
    setCameraState({ camera: cameraPos, target: targetPos });
  });

  return null; // This component doesn't render anything
}

// Function to create voxel block for minecraft style
const createVoxelBlock = (position: [number, number, number], color: string, size = 1) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Type for different light types
type LightType = 'directional' | 'point' | 'spot';

// Type for light settings
type LightSettings = {
  additionalLights: Array<{
    id: string;
    type: LightType;
    position: { x: number; y: number; z: number };
    target?: { x: number; y: number; z: number }; // For directional and spot lights
    intensity: number;
    color: string;
    castShadow: boolean;
    angle?: number; // For spot lights
    penumbra?: number; // For spot lights
  }>;
};

// Movable lights component
const MovableLights = ({ lightSettings }: { 
  lightSettings: LightSettings;
}) => {
  return (
    <>
      {/* Map through all user-added lights */}
      {lightSettings.additionalLights.map(light => {
        if (light.type === 'directional') {
          return (
            <directionalLight 
              key={light.id}
              position={[light.position.x, light.position.y, light.position.z]} 
              intensity={light.intensity} 
              color={light.color} 
              castShadow={light.castShadow}
              shadow-mapSize={[4096, 4096]}
              shadow-bias={-0.0005}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
              shadow-camera-near={0.1}
              shadow-camera-far={50}
              shadow-radius={3}
            />
          );
        } else if (light.type === 'spot') {
          return (
            <spotLight 
              key={light.id}
              position={[light.position.x, light.position.y, light.position.z]} 
              target-position={light.target ? [light.target.x, light.target.y, light.target.z] : undefined}
              intensity={light.intensity} 
              color={light.color} 
              castShadow={light.castShadow}
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0005}
              angle={light.angle || Math.PI / 6}
              penumbra={light.penumbra || 0.5}
              distance={50}
              decay={2}
            />
          );
        } else {
          // Default to point light
          return (
            <pointLight 
              key={light.id}
              position={[light.position.x, light.position.y, light.position.z]} 
              intensity={light.intensity} 
              color={light.color} 
              castShadow={light.castShadow}
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.001}
              distance={50}
              decay={2}
            />
          );
        }
      })}
    </>
  );
};

// Additional Light Control component for individual custom lights
const AdditionalLightControls = ({ 
  light, 
  onUpdate, 
  onDelete 
}: { 
  light: LightSettings['additionalLights'][0];
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div style={{ marginBottom: '15px', borderTop: '1px solid #444', paddingTop: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{light.type.charAt(0).toUpperCase() + light.type.slice(1)} Light {light.id.slice(0, 4)}:</div>
        <button 
          onClick={() => onDelete(light.id)} 
          style={{ 
            background: '#ff4444', 
            border: 'none', 
            borderRadius: '3px', 
            padding: '2px 5px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '10px'
          }}
        >
          Remove
        </button>
      </div>
      
      {/* Position controls */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '15px' }}>X:</label>
        <input 
          type="range" 
          min="-20" 
          max="20" 
          step="0.1" 
          value={light.position.x} 
          onChange={(e) => onUpdate(light.id, { position: { ...light.position, x: parseFloat(e.target.value) } })}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <span>{light.position.x.toFixed(1)}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '15px' }}>Y:</label>
        <input 
          type="range" 
          min="0" 
          max="20" 
          step="0.1" 
          value={light.position.y} 
          onChange={(e) => onUpdate(light.id, { position: { ...light.position, y: parseFloat(e.target.value) } })}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <span>{light.position.y.toFixed(1)}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '15px' }}>Z:</label>
        <input 
          type="range" 
          min="-20" 
          max="20" 
          step="0.1" 
          value={light.position.z} 
          onChange={(e) => onUpdate(light.id, { position: { ...light.position, z: parseFloat(e.target.value) } })}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <span>{light.position.z.toFixed(1)}</span>
      </div>
      
      {/* Target controls for directional and spot lights */}
      {(light.type === 'directional' || light.type === 'spot') && light.target && (
        <>
          <div style={{ marginTop: '10px' }}>Target Position:</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '15px' }}>X:</label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.1" 
              value={light.target.x} 
              onChange={(e) => onUpdate(light.id, { target: { ...light.target, x: parseFloat(e.target.value) } })}
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>{light.target.x.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '15px' }}>Y:</label>
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="0.1" 
              value={light.target.y} 
              onChange={(e) => onUpdate(light.id, { target: { ...light.target, y: parseFloat(e.target.value) } })}
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>{light.target.y.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '15px' }}>Z:</label>
            <input 
              type="range" 
              min="-20" 
              max="20" 
              step="0.1" 
              value={light.target.z} 
              onChange={(e) => onUpdate(light.id, { target: { ...light.target, z: parseFloat(e.target.value) } })}
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>{light.target.z.toFixed(1)}</span>
          </div>
        </>
      )}
      
      {/* Spot light specific controls */}
      {light.type === 'spot' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '60px' }}>Angle:</label>
            <input 
              type="range" 
              min="0" 
              max="1.57" 
              step="0.01" 
              value={light.angle || Math.PI / 6} 
              onChange={(e) => onUpdate(light.id, { angle: parseFloat(e.target.value) })}
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>{((light.angle || Math.PI / 6) * 180 / Math.PI).toFixed(1)}°</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '60px' }}>Penumbra:</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={light.penumbra || 0.5} 
              onChange={(e) => onUpdate(light.id, { penumbra: parseFloat(e.target.value) })}
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>{(light.penumbra || 0.5).toFixed(2)}</span>
          </div>
        </>
      )}
      
      {/* Common controls for all lights */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '15px' }}>I:</label>
        <input 
          type="range" 
          min="0" 
          max="2" 
          step="0.05" 
          value={light.intensity} 
          onChange={(e) => onUpdate(light.id, { intensity: parseFloat(e.target.value) })}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <span>{light.intensity.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '60px' }}>Color:</label>
        <input 
          type="color" 
          value={light.color} 
          onChange={(e) => onUpdate(light.id, { color: e.target.value })}
          style={{ width: '50px', marginRight: '5px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <label style={{ width: '60px' }}>Shadow:</label>
        <input 
          type="checkbox" 
          checked={light.castShadow} 
          onChange={(e) => onUpdate(light.id, { castShadow: e.target.checked })}
          style={{ marginRight: '5px' }}
        />
      </div>
    </div>
  );
};

// Light type selector for adding new lights
const LightTypeSelector = ({ onSelect, onCancel }: { 
  onSelect: (type: LightType) => void; 
  onCancel: () => void;
}) => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.9)',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 2000,
      width: '300px'
    }}>
      <h3 style={{ textAlign: 'center', color: 'white', marginTop: 0 }}>Select Light Type</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => onSelect('directional')}
          style={{ 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Directional Light
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            Moon-like light that casts parallel shadows
          </div>
        </button>
        <button 
          onClick={() => onSelect('point')}
          style={{ 
            padding: '10px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Point Light
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            Light that emits from a single point in all directions
          </div>
        </button>
        <button 
          onClick={() => onSelect('spot')}
          style={{ 
            padding: '10px', 
            backgroundColor: '#FF9800', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Spot Light
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            Light that emits in a cone, like a flashlight
          </div>
        </button>
        <button 
          onClick={onCancel}
          style={{ 
            padding: '10px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Light controls HUD
const LightControlsHUD = ({ lightSettings, setLightSettings }: { 
  lightSettings: LightSettings;
  setLightSettings: (settings: LightSettings) => void;
}) => {
  const [showLightTypeSelector, setShowLightTypeSelector] = useState(false);

  const handleUpdateAdditionalLight = (id: string, updates: any) => {
    setLightSettings({
      ...lightSettings,
      additionalLights: lightSettings.additionalLights.map(light => 
        light.id === id ? { ...light, ...updates } : light
      )
    });
  };

  const handleDeleteAdditionalLight = (id: string) => {
    setLightSettings({
      ...lightSettings,
      additionalLights: lightSettings.additionalLights.filter(light => light.id !== id)
    });
  };

  const handleAddLight = (type: LightType) => {
    // Create a new light with default settings based on type
    const newLight: LightSettings['additionalLights'][0] = {
      id: `light_${Date.now()}`,
      type,
      position: { x: 0, y: 5, z: 0 },
      intensity: type === 'directional' ? 1.0 : 0.5,
      color: type === 'directional' ? '#FFFDF6' : '#FFFFFF',
      castShadow: true
    };

    // Add target for directional and spot lights
    if (type === 'directional' || type === 'spot') {
      newLight.target = { x: 0, y: 0, z: 0 };
    }

    // Add spot light specific properties
    if (type === 'spot') {
      newLight.angle = Math.PI / 6; // 30 degrees
      newLight.penumbra = 0.5; // Soft edge
    }

    setLightSettings({
      ...lightSettings,
      additionalLights: [...lightSettings.additionalLights, newLight]
    });
    
    setShowLightTypeSelector(false);
  };

  return (
    <>
      {showLightTypeSelector && (
        <LightTypeSelector 
          onSelect={handleAddLight} 
          onCancel={() => setShowLightTypeSelector(false)} 
        />
      )}
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          zIndex: 1000,
          width: '300px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Light Controls</h3>
          <button 
            onClick={() => setShowLightTypeSelector(true)} 
            style={{ 
              background: '#4CAF50', 
              border: 'none', 
              borderRadius: '3px', 
              padding: '3px 8px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            Add Light
          </button>
        </div>
        
        {/* Ambient Light Control */}
        <div style={{ marginBottom: '15px' }}>
          <div>Ambient Light:</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <label style={{ width: '15px' }}>I:</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={0.1} 
              onChange={() => {}} // This is handled at the Canvas level
              style={{ width: '100px', marginRight: '5px', opacity: 0.5 }}
              disabled
            />
            <span>0.1 (fixed)</span>
          </div>
        </div>
        
        {/* User-added lights */}
        {lightSettings.additionalLights.length > 0 ? (
          <div>
            {lightSettings.additionalLights.map(light => (
              <AdditionalLightControls 
                key={light.id} 
                light={light} 
                onUpdate={handleUpdateAdditionalLight}
                onDelete={handleDeleteAdditionalLight}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            No lights added. Click "Add Light" to create a light.
          </div>
        )}
        
        <div style={{ marginTop: '15px', fontSize: '10px' }}>
          Copy this to console when satisfied:
          <pre style={{ 
            background: '#222', 
            padding: '5px', 
            overflowX: 'auto',
            fontSize: '8px',
            marginTop: '5px'
          }}>
            {JSON.stringify(lightSettings, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

// Type for wall lamp settings
type WallLamp = {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  intensity: number;
  color: string;
  distance: number;
  castShadow: boolean;
  enabled: boolean;
};

// Wall Lamp Control component
const WallLampControls = ({ 
  lamps, 
  setLamps 
}: { 
  lamps: WallLamp[];
  setLamps: (lamps: WallLamp[]) => void;
}) => {
  const handleLampChange = (id: string, property: string, subProperty: string | null, value: any) => {
    setLamps(
      lamps.map(lamp => {
        if (lamp.id === id) {
          if (subProperty) {
            return {
              ...lamp,
              [property]: {
                ...(lamp as any)[property],
                [subProperty]: value
              }
            };
          } else {
            return {
              ...lamp,
              [property]: value
            };
          }
        }
        return lamp;
      })
    );
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 1000,
        width: '300px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}
    >
      <h3 style={{ marginTop: 0, textAlign: 'center' }}>Wall Lamp Controls</h3>
      
      {lamps.map(lamp => (
        <div key={lamp.id} style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '10px' 
          }}>
            <h4 style={{ margin: 0 }}>{lamp.id}</h4>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Enabled</span>
              <input 
                type="checkbox" 
                checked={lamp.enabled} 
                onChange={(e) => handleLampChange(lamp.id, 'enabled', null, e.target.checked)}
              />
            </label>
          </div>
          
          {/* Position Controls */}
          <div style={{ marginBottom: '10px' }}>
            <div>Position:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>X:</label>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={lamp.position.x} 
                onChange={(e) => handleLampChange(lamp.id, 'position', 'x', parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{lamp.position.x.toFixed(1)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>Y:</label>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="0.1" 
                value={lamp.position.y} 
                onChange={(e) => handleLampChange(lamp.id, 'position', 'y', parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{lamp.position.y.toFixed(1)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>Z:</label>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={lamp.position.z} 
                onChange={(e) => handleLampChange(lamp.id, 'position', 'z', parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{lamp.position.z.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Rotation Controls */}
          <div style={{ marginBottom: '10px' }}>
            <div>Rotation:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>Y:</label>
              <input 
                type="range" 
                min="0" 
                max="6.28" 
                step="0.1" 
                value={lamp.rotation.y} 
                onChange={(e) => handleLampChange(lamp.id, 'rotation', 'y', parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{(lamp.rotation.y * 180 / Math.PI).toFixed(0)}°</span>
            </div>
          </div>
          
          {/* Light Controls */}
          <div style={{ marginBottom: '10px' }}>
            <div>Light:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>I:</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={lamp.intensity} 
                onChange={(e) => handleLampChange(lamp.id, 'intensity', null, parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{lamp.intensity.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '15px' }}>D:</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5" 
                value={lamp.distance} 
                onChange={(e) => handleLampChange(lamp.id, 'distance', null, parseFloat(e.target.value))}
                style={{ width: '100px', marginRight: '5px' }}
              />
              <span>{lamp.distance.toFixed(1)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '60px' }}>Color:</label>
              <input 
                type="color" 
                value={lamp.color} 
                onChange={(e) => handleLampChange(lamp.id, 'color', null, e.target.value)}
                style={{ width: '50px', marginRight: '5px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <label style={{ width: '60px' }}>Shadow:</label>
              <input 
                type="checkbox" 
                checked={lamp.castShadow} 
                onChange={(e) => handleLampChange(lamp.id, 'castShadow', null, e.target.checked)}
                style={{ marginRight: '5px' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Renders a wall lamp from its settings
const WallLamp = ({ lamp }: { lamp: WallLamp }) => {
  if (!lamp.enabled) return null;
  
  return (
    <group 
      position={[lamp.position.x, lamp.position.y, lamp.position.z]} 
      rotation={[lamp.rotation.x, lamp.rotation.y, lamp.rotation.z]}
    >
      {/* Lamp fixture */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#7a5c3d" metalness={0.5} roughness={0.8} />
      </mesh>
      {/* Lamp shade */}
      <mesh position={[0, -0.15, 0.15]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 8, 1, true]} />
        <meshStandardMaterial color="#f8e8d8" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Light source */}
      <pointLight
        position={[0, -0.15, 0.2]}
        intensity={lamp.intensity}
        color={lamp.color}
        distance={lamp.distance}
        decay={2}
        castShadow={lamp.castShadow}
        shadow-mapSize={[512, 512]}
      />
      {/* Warm glow */}
      <mesh position={[0, -0.15, 0.15]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={lamp.color} />
      </mesh>
    </group>
  );
};

// Controlled camera component that handles navigation
const ControlledCamera = ({ initialPosition = isometricView.position, setCameraState }: { initialPosition: Vector3, setCameraState: (state: CameraPositionState) => void }) => {
  const { camera, scene } = useThree()
  const controlsRef = useRef<any>()
  
  // Add state for tracking transitions
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetPosition, setTargetPosition] = useState<Vector3>(initialPosition)
  const [targetLookAt, setTargetLookAt] = useState<Vector3>(isometricView.target)
  
  useEffect(() => {
    // Set initial camera position only once
    camera.position.copy(initialPosition)
    
    // Keep event listener for navigation but don't override user position if they've moved
    const handleNavigation = (event: Event) => {
      const { section } = (event as CustomEvent).detail
      
      // Only apply navigation positions if explicitly requested via section change
      if (section && cameraPositions[section as SectionType] && controlsRef.current) {
        // Restore smooth transitions for all sections including Projects
        setTargetPosition(cameraPositions[section as SectionType].position.clone())
        setTargetLookAt(cameraPositions[section as SectionType].target.clone())
        setIsTransitioning(true)
      }
    }

    window.addEventListener('navigate-scene', handleNavigation as EventListener)
    return () => window.removeEventListener('navigate-scene', handleNavigation as EventListener)
  }, [initialPosition, camera])

  useFrame(() => {
    if (controlsRef.current) {
      // Store controls reference for position updater
      camera.userData.controls = controlsRef.current
      
      // Apply smooth transitions only when changing sections
      if (isTransitioning) {
        // Smoothly interpolate camera position
        const lerpFactor = 0.03 // Slightly slower for more visible transition
        
        // Lerp camera position
        camera.position.lerp(targetPosition, lerpFactor)
        
        // Lerp target position
        controlsRef.current.target.lerp(targetLookAt, lerpFactor)
        
        // Check if we're close enough to end the transition
        const positionDistance = camera.position.distanceTo(targetPosition)
        const targetDistance = controlsRef.current.target.distanceTo(targetLookAt)
        
        if (positionDistance < 0.05 && targetDistance < 0.05) {
          setIsTransitioning(false)
        }
      }
      
      // Just update controls normally
      controlsRef.current.update()
      
      // Update camera state for debug HUD
      const cameraPos = {
        x: Math.round(camera.position.x * 100) / 100,
        y: Math.round(camera.position.y * 100) / 100,
        z: Math.round(camera.position.z * 100) / 100
      };
      
      const targetPos = {
        x: Math.round(controlsRef.current.target.x * 100) / 100,
        y: Math.round(controlsRef.current.target.y * 100) / 100,
        z: Math.round(controlsRef.current.target.z * 100) / 100
      };
      
      setCameraState({ camera: cameraPos, target: targetPos });
    }
  })

  return (
    <>
      {/* Using perspective camera instead of orthographic for more natural rotation */}
      <PerspectiveCamera
        makeDefault
        position={initialPosition.toArray()}
        fov={45}
        near={0.1}
        far={1000}
      />
      <OrbitControls 
        ref={controlsRef}
        target={isometricView.target.toArray()}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={1}
        // Completely unrestricted rotation
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        enableZoom={true}
        minDistance={1}
        maxDistance={50}
        enablePan={true}
        panSpeed={1}
        // Disable any auto-rotation
        autoRotate={false}
        // Make sure there are no keyboard interactions interfering
        enableKeys={false}
        // Ensure nothing prevents defaults
        makeDefault={true}
        // Disable controls during transition for smoother camera movement
        enabled={!isTransitioning}
      />
    </>
  )
}

// Night sky component with stars
const NightSky = () => {
  const count = 1000; // Number of stars
  const [positions, setPositions] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    // Create random positions for stars
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create stars in a sphere around the camera
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 40 + Math.random() * 10; // Distance from center (far away)
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    setPositions(positions);
  }, []);
  
  if (!positions) return null;
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        color="#FFFFFF"
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Moon component
const Moon = () => {
  return (
    <mesh position={[-15, 20, -20]}>
      <sphereGeometry args={[3, 16, 16]} />
      <meshBasicMaterial color="#E8F1FF" />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.5} 
        color="#A6C9FF"
        distance={100}
        decay={0}
      />
    </mesh>
  );
};

// Main scene component that includes loaded model and decorative elements
const MinecraftWorld = ({ lightSettings, setLightSettings }: { 
  lightSettings: LightSettings;
  setLightSettings: (settings: LightSettings) => void;
}) => {
  const { scene: modelScene } = useGLTF('/models/scene.gltf')
  
  useEffect(() => {
    // Apply shadows to all objects in the scene
    modelScene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        // Enable shadows for all objects
        object.castShadow = true;
        object.receiveShadow = true;
        
        // Handle materials
        if (object.material) {
          // Clone the material to prevent modifying shared materials
          if (Array.isArray(object.material)) {
            object.material = object.material.map(mat => mat.clone());
          } else {
            object.material = object.material.clone();
          }
          
          // Handle different material types
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                applyMaterialProperties(mat, object.name);
              }
            });
          } else if (object.material instanceof THREE.MeshStandardMaterial) {
            applyMaterialProperties(object.material, object.name);
          }
        }
      }
    });
    
    // Debug shadow issues
    console.log("Shadow setup complete. Objects with shadows:", countShadowObjects(modelScene));
  }, [modelScene]);
  
  // Helper function to apply material properties - adjusted for night time
  const applyMaterialProperties = (material: THREE.MeshStandardMaterial, name: string) => {
    // Set base material properties for shadow rendering
    material.roughness = 0.7;
    material.metalness = 0.1;
    material.shadowSide = THREE.FrontSide;
    material.needsUpdate = true;
    
    // Color assignment based on object name - adjusted for night time (more muted)
    const lowerName = name.toLowerCase();
    
    // Apply night-time colors
    if (lowerName.includes('wall') || lowerName.includes('room')) {
      material.color.set('#b6b6c4'); // Blueish-gray walls for night
    } else if (lowerName.includes('floor') || lowerName.includes('wood') || lowerName.includes('plank')) {
      material.color.set('#614b35'); // Darker wood for night
    } else if (lowerName.includes('desk') || lowerName.includes('shelf') || lowerName.includes('table')) {
      material.color.set('#e6e6e6'); // Light gray furniture
    } else if (lowerName.includes('chair')) {
      material.color.set('#96511c'); // Darker orange chair for night
    } else if (lowerName.includes('pot') || lowerName.includes('planter')) {
      material.color.set('#7d4616'); // Darker pot for night
    } else if (lowerName.includes('plant') || lowerName.includes('leaf')) {
      material.color.set('#1a6637'); // Darker green plants for night
    } else if (lowerName.includes('monitor') || lowerName.includes('screen')) {
      // Add glow to screen in the dark
      material.color.set('#7f8c8d');
      material.emissive.set('#111111');
    } else if (lowerName.includes('computer') || lowerName.includes('tower')) {
      material.color.set('#242e3a'); // Dark gray computer
    } else if (lowerName.includes('window') || lowerName.includes('frame')) {
      material.color.set('#a7b8c0'); // Bluish window frame for night
    } else if (lowerName.includes('book')) {
      material.color.set('#5e3818'); // Darker books for night
    }
    
    // Add slight emissive glow to window to simulate light from outside
    if (lowerName.includes('window')) {
      material.emissive.set('#102037');
      material.emissiveIntensity = 0.2;
    }
  };
  
  // Helper function to count objects with shadows
  const countShadowObjects = (scene: THREE.Object3D) => {
    let count = { castShadow: 0, receiveShadow: 0, total: 0 };
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        count.total++;
        if (obj.castShadow) count.castShadow++;
        if (obj.receiveShadow) count.receiveShadow++;
      }
    });
    return count;
  };

  return (
    <>
      {/* Night sky and moon */}
      <NightSky />
      <Moon />
      
      {/* Main imported scene - adjusted position and rotation to show interior */}
      <primitive 
        object={modelScene.clone()} 
        scale={0.5} 
        position={[0, -1, 0]} 
        rotation={[0, -Math.PI / 3, 0]}
      />
      
      {/* Manually add a shadow-receiving floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.02, 0]} 
        receiveShadow={true}
      >
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      
      {/* Add a couple of warm indoor lights to windows */}
      <pointLight 
        position={[3, 1.5, 3]} 
        intensity={0.3} 
        color="#FF8C23" 
        distance={5} 
        decay={2}
        castShadow
      />
      
      {/* Very low ambient light for night time */}
      <ambientLight intensity={0.05} color="#0A1026" />
      
      {/* Movable lights */}
      <MovableLights lightSettings={lightSettings} />
    </>
  )
}

// Component to display camera position for debugging
const CameraDebugHUD: React.FC<{ cameraState: CameraPositionState }> = ({ cameraState }) => {
  if (!cameraState) return null;
  
  return (
    <div style={{ display: 'none', position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', fontFamily: 'monospace', fontSize: '12px', zIndex: 100, borderRadius: '5px' }}>
      <div>Camera Position: x:{cameraState.camera.x.toFixed(2)}, y:{cameraState.camera.y.toFixed(2)}, z:{cameraState.camera.z.toFixed(2)}</div>
      <div>Camera Target: x:{cameraState.target.x.toFixed(2)}, y:{cameraState.target.y.toFixed(2)}, z:{cameraState.target.z.toFixed(2)}</div>
    </div>
  );
};

// Main component with ratio adjusted back to 35-65
const MinecraftScene = () => {
  const [cameraState, setCameraState] = useState<CameraPositionState>({
    camera: { x: 0, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 }
  });
  
  // Light settings based on the provided configuration
  const [lightSettings, setLightSettings] = useState<LightSettings>({
    additionalLights: [
      {
        id: "moonlight",
        type: "directional",
        position: { x: -10, y: 15, z: -5 },
        target: { x: 0, y: 0, z: 0 },
        intensity: 0.45,
        color: "#e8eaed",
        castShadow: true
      },
      {
        id: "light_1744710065232",
        type: "point",
        position: { x: 0, y: 2.3, z: 0 },
        intensity: 1.3,
        color: "#ffffff",
        castShadow: true
      }
    ]
  });

  return (
    <div className="w-[35%] h-full absolute top-0 left-0 overflow-hidden" style={{ 
      zIndex: 999, 
      position: 'fixed',
      pointerEvents: 'auto' // Ensure pointer events work
    }}>
      {/* Camera debug HUD - now outside of Canvas */}
      <CameraDebugHUD cameraState={cameraState} />
      
      {/* Light controls HUD hidden by removing it */}
      {/* <LightControlsHUD lightSettings={lightSettings} setLightSettings={setLightSettings} /> */}
      
      <Canvas
        shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
        gl={{ antialias: true }}
        camera={{ position: [9.16, 2.78, 0.95], near: 0.1, far: 1000 }}
        onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          // physicallyCorrectLights is not available in this version of THREE.js
          console.log("Canvas created with shadowMap:", gl.shadowMap);
        }}
        style={{ touchAction: 'none' }} // Improve touch handling
      >
        {/* Night sky background - deep blue */}
        <color attach="background" args={['#0A1026']} />
        
        {/* More dense fog for night atmosphere */}
        <fog attach="fog" args={['#0A1026', 20, 40]} />
        
        <ControlledCamera initialPosition={isometricView.position} setCameraState={setCameraState} />
        <MinecraftWorld 
          lightSettings={lightSettings} 
          setLightSettings={setLightSettings}
        />
      </Canvas>
    </div>
  )
}

export default MinecraftScene 