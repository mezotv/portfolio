"use client";

import type { Feature, GeoJsonObject } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";
import { useCountries } from "@/lib/geo";
import { CountryFlag } from "@/components/icons/CountryFlag";

interface TooltipContent {
  name: string;
  code: string;
}

interface TooltipPosition {
  x: number;
  y: number;
}

export function MapComponent({
  height,
  visitedCountries = [],
  isLoading: passedIsLoading = false,
}: {
  height: string;
  visitedCountries?: string[];
  isLoading?: boolean;
}) {
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data: countriesGeoData, isLoading, error } = useCountries();

  // Debug logging
  useEffect(() => {
    console.log("MapComponent mounted");
    console.log("Visited countries:", visitedCountries);
    console.log("Countries data loading:", isLoading);
    console.log("Countries data error:", error);
    console.log("Countries data:", countriesGeoData ? "Loaded" : "Not loaded");
  }, [visitedCountries, isLoading, error, countriesGeoData]);

  const handleStyle = (feature: Feature<any>) => {
    const countryCode = feature?.properties?.ISO_A2;
    const isVisited = visitedCountries.includes(countryCode);
    const isHovered = hoveredId === countryCode;

    console.log(`Styling country: ${countryCode}, visited: ${isVisited}`);

    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains('dark');
    
    // Define colors for both modes
    const colors = {
      visited: {
        light: {
          border: isHovered ? "rgba(59, 130, 246, 0.9)" : "rgba(59, 130, 246, 0.6)",
          fill: "#3b82f6"
        },
        dark: {
          border: isHovered ? "rgba(96, 165, 250, 0.9)" : "rgba(96, 165, 250, 0.6)",
          fill: "#60a5fa"
        }
      },
      unvisited: {
        light: {
          border: "rgba(107, 114, 128, 0.4)",
          fill: "#d1d5db"
        },
        dark: {
          border: "rgba(75, 85, 99, 0.5)",
          fill: "#374151"
        }
      }
    };

    const currentTheme = isDark ? 'dark' : 'light';
    const currentColors = isVisited ? colors.visited[currentTheme] : colors.unvisited[currentTheme];

    return {
      color: currentColors.border,
      weight: isVisited ? (isHovered ? 2.5 : 1.5) : 0.5,
      fill: true,
      fillColor: currentColors.fill,
      fillOpacity: isVisited ? (isHovered ? 0.8 : 0.6) : 0.3,
      opacity: 1,
    };
  };

  const handleEachFeature = (feature: Feature<any>, layer: Layer) => {
    const countryCode = feature.properties?.ISO_A2;
    
    // Add interactivity to all countries
    layer.on({
      mouseover: () => {
        setHoveredId(countryCode);
        const name = feature.properties?.ADMIN;
        setTooltipContent({
          name,
          code: countryCode,
        });
      },
      mouseout: () => {
        setHoveredId(null);
        setTooltipContent(null);
      },
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [resolvedHeight, setResolvedHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setResolvedHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const zoom = resolvedHeight ? Math.log2(resolvedHeight / 400) + 1 : 1;

  if (isLoading || passedIsLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-blue-500 dark:border-blue-400 border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Loading map...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load map data</p>
          <p className="text-sm text-red-500 dark:text-red-300 mt-1">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!countriesGeoData) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900/20 rounded">
        <p className="text-gray-600 dark:text-gray-400">No map data available</p>
      </div>
    );
  }

  return (
    <div
      onMouseMove={(e) => {
        if (tooltipContent) {
          setTooltipPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }
      }}
      style={{
        height: height,
      }}
      ref={containerRef}
      className="relative bg-zinc-800 rounded-lg overflow-hidden"
    >
      <MapContainer
        preferCanvas={true}
        attributionControl={false}
        zoomControl={false}
        center={[40, 3]}
        zoom={zoom}
        style={{
          height: "100%",
          background: "none",
          cursor: "default",
          outline: "none",
          zIndex: "1",
        }}
      >
        <GeoJSON
          data={countriesGeoData as GeoJsonObject}
          style={handleStyle as any}
          onEachFeature={handleEachFeature}
        />
      </MapContainer>

      {tooltipContent && (
        <div
          className="fixed z-50 bg-muted text-foreground rounded-lg p-3 shadow-xl border border-border text-sm pointer-events-none backdrop-blur-sm dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.2)]"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-medium flex items-center gap-2">
            {tooltipContent.code && (
              <CountryFlag country={tooltipContent.code.slice(0, 2)} />
            )}
            <span className="text-foreground">
              {tooltipContent.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 