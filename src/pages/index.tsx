import { Input } from "@/components/Input";
import PrintButton from "@/components/PrintButton";
import { Td } from "@/components/Td";
import { Geist, Geist_Mono } from "next/font/google";
import { ChangeEvent, RefObject, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ContentNode } from "react-to-print/lib/types/ContentNode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const minutesRemaining = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutesRemaining
    .toString()
    .padStart(2, "0")}`;
}

export default function Home() {
  const [de, setDe] = useState(0); // minutos
  const [ate, setAte] = useState(23 * 60);
  const [intervalo, setIntervalo] = useState(120); // minutos
  const [quantidade, setQuantidade] = useState(1);

  const horarios = useMemo(() => {
    const lista: number[] = [];
    for (let i = de; i <= ate; i += intervalo) {
      lista.push(i);
    }
    return lista;
  }, [de, ate, intervalo]);

  const handleDe = (e: ChangeEvent<HTMLInputElement>) =>
    setDe(timeToMinutes(e.target.value));

  const handleAte = (e: ChangeEvent<HTMLInputElement>) =>
    setAte(timeToMinutes(e.target.value));

  const handleIntervalo = (e: ChangeEvent<HTMLInputElement>) =>
    setIntervalo(Number(e.target.value));

  const handleQuantidade = (e: ChangeEvent<HTMLInputElement>) =>
    setQuantidade(Number(e.target.value));

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "tabela",
  });

  return (
    <main className="bg-linear-to-t from-gray-950 to-gray-800 text-gray-950 p-3.5 w-screen min-h-screen">
      {/* Inputs */}
      <div className="border rounded-md p-5 my-2.5 bg-white w-100 space-y-2 m-auto flex gap-1">
        <div className="flex flex-col justify-center items-center">
          <div>
            <label>De</label>
            <input
              type="time"
              value={minutesToTime(de)}
              onChange={handleDe}
              className="ml-2"
            />
          </div>
          <div>
            <label>Até</label>
            <input
              type="time"
              value={minutesToTime(ate)}
              onChange={handleAte}
              className="ml-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <label>Intervalo (minutos)</label>
            <input
              type="number"
              min={1}
              value={intervalo}
              onChange={handleIntervalo}
              className="ml-2 w-12"
            />
          </div>
          <div className="flex flex-col items-center">
            <label>Quantos remédios diferentes?</label>
            <input
              type="number"
              min={1}
              value={quantidade}
              onChange={handleQuantidade}
              className="ml-2 w-12"
            />
          </div>
        </div>
        <div className="w-px bg-gray-300 h-50 mx-4"></div> 
        <div className="flex flex-col items-center justify-center">
          <PrintButton handlePrint={handlePrint} />
        </div>
      </div>

      {/* Tabela */}
      <div id="tabela" ref={componentRef} className="border rounded-md p-5 my-0.5 bg-white m-auto">
        <div className="flex flex-col items-center">
          <h4 className={`${geistSans.className} text-xl underline`}>
            &#128138; Horários de remédios
          </h4>
          <small className="text-sm text-center">nome do paciente</small>
          <div className="border rounded-md mt-0.5 mb-2 w-70 h-10">
            <Input />
          </div>
        </div>
        <div>
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th className="table-cell border px-2">Remédio</th>
                <th className="table-cell border px-2">Quantidade</th>
                {horarios.map((h, idx) => (
                  <th key={idx} className="table-cell border px-2">
                    {minutesToTime(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: quantidade }).map((_, idx) => (
                <tr key={idx}>
                  <Td classe="border" />
                  <Td classe="border" />
                  {horarios.map((h, i) => (
                    <Td key={i} classe="border"/>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
