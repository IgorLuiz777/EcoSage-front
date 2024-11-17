import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigator = useNavigate()

    return(
        <div className="m-4">
            <h1>HOME</h1>
            <Button onClick={() => navigator('/dashboard')} className="">Adicionar equipamentos</Button>
        </div>
    )

}