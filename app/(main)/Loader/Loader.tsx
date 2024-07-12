import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="h-screen bg-white w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-black mb-4">The Shorter One</h1>
      <h1 className="text-lg mb-12 animate-bounce">Redirecting...</h1>
      <div className="loader" />
    </div>
  );
}
