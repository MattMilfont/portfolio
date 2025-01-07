"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header";

export default function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter(); 

  const checkAuthentication = async () => {
    const sessionKey = localStorage.getItem("sessionKey");  
    
    if (!sessionKey) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  };
  
  useEffect(() => {
      checkAuthentication();  
  });

  return (
    <div>
      <Header title="Mojave Express" />
      <div className="container-fluid">
        <div
          className="col-md-10 offset-md-1 mt-10"
          style={{ paddingTop: "2%" }}
        >
          <h1>Bem-vindo ao Mojave Express Manager</h1>
          <p>
            Esse sistema foi feito para que você possa gerenciar a sua frota de
            caminhões de forma prática e fácil.
          </p>
        </div>
      </div>
    </div>
  );
}
