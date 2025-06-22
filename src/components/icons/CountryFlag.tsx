"use client";

import { useMemo } from "react";

interface CountryFlagProps {
  country: string;
  size?: number;
}

export function CountryFlag({ country, size = 18 }: CountryFlagProps) {
  const countryCode = country.toLowerCase();
  
  const imageUrl = useMemo(() => 
    `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`,
    [countryCode]
  );
  
  return (
    <img
      src={imageUrl}
      alt={`${country} flag`}
      width={size}
      height={size * 0.75}
      className="inline-block rounded-sm object-cover"
      style={{ aspectRatio: "4/3" }}
    />
  );
}