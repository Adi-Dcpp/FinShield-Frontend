import Navbar from "../components/Navbar.jsx"
import PhoneUI from "../components/PhoneUI.jsx"

const Simulator = () => {
    return (
       <>
        <Navbar />
        <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center justify-center px-4 py-8 lg:justify-start lg:pl-12 xl:pl-18">
            <PhoneUI />
        </section>
       </>
    ) 
}

export default Simulator