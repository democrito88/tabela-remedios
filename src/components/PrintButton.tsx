import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function PrintButton({handlePrint}: any) {

    return (
        <button onClick={handlePrint} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Imprimir
        </button>
    );
}