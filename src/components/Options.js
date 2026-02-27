import { useRouter } from 'next/navigation';
import React from 'react'

export default function Options(props) {
    const { base, sauce, cheese, toppings, setBase, setSauce, setCheese, setToppings } = props;
    const router = useRouter();
    const prices = { base: 150, sauce: 40, cheese: 60, toppings: 30 };
    const total = (base ? prices.base : 0) + (sauce ? prices.sauce : 0) + (cheese ? prices.cheese : 0) + toppings.length * prices.toppings;

    const toppingOrder = ["Tomato", "Capsicum", "Olives", "Sweet Corn", "Onion", "Paneers"];

    const pizzaOptions = [
        {
            title: "Base",
            options: ["Classic Hand Tossed", "Thin Crust", "Cheese Burst", "Whole Wheat"],
            grid: "grid-cols-2",
        },
        {
            title: "Sauce",
            options: ["Classic Tomato", "Spicy Desi", "Peri Peri", "Creamy Garlic"],
            grid: "grid-cols-2",
        },
        {
            title: "Cheese",
            options: ["Mozzarella", "Extra Cheese", "Cheddar Mix", "Paneer Cheese"],
            grid: "grid-cols-2",
        },
        {
            title: "Toppings",
            options: ["Onion", "Capsicum", "Tomato", "Paneers", "Sweet Corn", "Olives"],
            grid: "grid-cols-3",
        },
    ];

    function handleOptions(title, option) {
        if (title === 'Base') {
            setBase(prev => prev === option ? '' : option);
        } else if (title === 'Sauce') {
            setSauce(prev => prev === option ? '' : option);
        } else if (title === 'Cheese') {
            setCheese(prev => prev === option ? '' : option);
        } else if (title === "Toppings") {
            setToppings(prev => {
                const updated = prev.includes(option)
                    ? prev.filter(item => item !== option)
                    : [...prev, option];
                return [...updated].sort(
                    (a, b) => toppingOrder.indexOf(a) - toppingOrder.indexOf(b)
                );
            });
        }
    }

    function isSelected(title, option) {
        if (title === "Base") return base === option;
        if (title === "Sauce") return sauce === option;
        if (title === "Cheese") return cheese === option;
        if (title === "Toppings") return toppings.includes(option);
    }

    function handleCheckout() {
        localStorage.setItem("pizza", JSON.stringify({ Base:base, Sauce:sauce, Cheese:cheese, Toppings:toppings }));
        router.push('/cart');
    }

    return (
        <div className="w-full lg:max-w-lg bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-t-2xl sm:rounded-2xl p-5 pt-2 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] font-nun">
            {pizzaOptions.map((menu, id) => (
                <div key={id}>
                    <h3 className="text-base sm:text-lg font-bold ml-2 mt-2 mb-0.5 text-zinc-400/85">
                        {menu.title}
                    </h3>
                    <div className={`grid ${menu.grid} gap-y-1 gap-x-1.5`}>
                        {menu.options.map((option, id) => (
                            <button
                                onClick={() => handleOptions(menu.title, option)}
                                key={id}
                                className={`py-1 rounded-lg font-extrabold border transition-all duration-200 ${isSelected(menu.title, option) ? "bg-amber-900/50 text-white border-amber-500/60 scale-97" : "bg-zinc-900/70 border-zinc-800 hover:border-zinc-600"}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* PRICE + CTA */}
            <div
                onClick={handleCheckout}
                className="cursor-pointer mt-4 bg-linear-to-r from-amber-400 to-amber-600 hover:bg-linear-to-r hover:from-orange-400 hover:to-orange-500 transition-colors duration-300 text-zinc-950 font-black text-base sm:text-xl rounded-xl py-3 px-4 flex justify-between items-center"
            >
                <span>Price : ₹{total}</span>
                <div className="bg-black/20 w-9 h-9 rounded-full flex items-center justify-center text-xl"> → </div>
            </div>
        </div>
    )
}