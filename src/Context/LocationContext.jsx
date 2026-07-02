import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // { lat, lon, city, area, pincode }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.address || {};

          const loc = {
            lat: latitude,
            lon: longitude,
            city:
              address.city ||
              address.town ||
              address.village ||
              address.county ||
              "Unknown",
            area: address.suburb || address.neighbourhood || "",
            pincode: address.postcode || "",
          };

          setLocation(loc);
          localStorage.setItem("roto_location", JSON.stringify(loc));
        } catch (err) {
          setError("Could not fetch your address");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        setError(
          err.code === 1
            ? "Location permission denied"
            : "Unable to fetch your location"
        );
      }
    );
  }, []);

  // load cached location so we don't ask every reload
  useEffect(() => {
    const saved = localStorage.getItem("roto_location");
    if (saved) setLocation(JSON.parse(saved));
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, loading, error, detectLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);