import { useEffect } from "react";

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="elfsight-app-9ac39fd0-32ea-40e3-8d12-61179548167d" data-elfsight-app-lazy></div>
  );
};

export default InstagramFeed;
