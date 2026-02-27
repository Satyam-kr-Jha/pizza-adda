"use client"
import NavBar from "@/components/NavBar";
import Options from "@/components/Options";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
    const [Base, setBase] = useState('')
    const [Sauce, setSauce] = useState('')
    const [Cheese, setCheese] = useState('')
    const [Toppings, setToppings] = useState([])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("pizza");
        if (saved) {
            const parsed = JSON.parse(saved);
            setBase(parsed.Base || '');
            setSauce(parsed.Sauce || '');
            setCheese(parsed.Cheese || '');
            setToppings(parsed.Toppings || []);
        }
        setLoaded(true);
    }, []);

    return (
        <div className="relative min-h-screen bg-black">
            <div className="w-full h-screen grid gap-2 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:pt-5">
                <div className="w-full h-full flex sm:items-center items-start sm:mt-0 mt-[10%] justify-center ">
                    <div className="relative xl:w-130 xl:h-130 lg:w-120 lg:h-120 sm:w-[55vw] sm:h-[55vw] w-[70vw] h-[70vw]">
                        {(!Base &&!Sauce &&!Cheese &&Toppings.length==0) && <h2 className="text-zinc-500 text-5xl font-nun font-black text-center flex h-full justify-center items-center">Customise Your <br/> Pizza here</h2>
                        }
                        {Base && <Image src={`/ingredients/${Base}.png`} loading="eager" fill alt="pizza" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=" absolute scale-[1.05]" />}
                        {Sauce && <Image src={`/ingredients/${Sauce}.png`} loading="eager" fill alt="pizza" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=" absolute scale-[0.9]" />}
                        {Cheese && <Image src={`/ingredients/${Cheese}.png`} loading="eager" fill alt="pizza" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=" absolute scale-[0.89]" />}
                        {Toppings.length > 0 && Toppings.map((topping, id) =>
                            <Image key={id} src={`/ingredients/${topping}.png`} loading="eager" fill alt="pizza" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className=" absolute scale-[0.85]" />
                        )}
                    </div>
                </div>
                <div className="w-full h-full flex items-end lg:items-center justify-center">
                    <Options base={Base} sauce={Sauce} cheese={Cheese} toppings={Toppings} setBase={setBase} setSauce={setSauce} setCheese={setCheese} setToppings={setToppings} />
                </div>
            </div>
        </div>
    );
}