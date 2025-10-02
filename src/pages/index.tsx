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
    <main className="bg-gradient-to-t from-gray-950 to-gray-800 text-gray-950 min-h-screen py-6 px-2 flex flex-col items-center">
      {/* Inputs Section */}
      <section className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Configuração dos horários</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-start gap-3">
              <div>
                <label htmlFor="de" className="block text-sm font-medium text-gray-600">De</label>
                <input
                  id="de"
                  type="time"
                  value={minutesToTime(de)}
                  onChange={handleDe}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="ate" className="block text-sm font-medium text-gray-600">Até</label>
                <input
                  id="ate"
                  type="time"
                  value={minutesToTime(ate)}
                  onChange={handleAte}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="intervalo" className="block text-sm font-medium text-gray-600">Intervalo (minutos)</label>
                <input
                  id="intervalo"
                  type="number"
                  min={1}
                  value={intervalo}
                  onChange={handleIntervalo}
                  className="mt-1 block w-25 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: 120"
                />
              </div>
            </div>
            <div className="flex justify-start gap-3">
              <div>
                <label htmlFor="quantidade" className="block text-sm font-medium text-gray-600">Quantos remédios diferentes?</label>
                <input
                  id="quantidade"
                  type="number"
                  min={1}
                  value={quantidade}
                  onChange={handleQuantidade}
                  className="mt-1 block w-25 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: 1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <PrintButton handlePrint={handlePrint} />
            <span className="text-xs text-gray-500">Clique para imprimir a tabela</span>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section
        id="tabela"
        ref={componentRef}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl"
      >
        <div className="flex flex-col items-center mb-4">
          <h4 className={`${geistSans.className} text-xl underline mb-1`}>
            &#128138; Horários de remédios
          </h4>
          <small className="text-sm text-center text-gray-500 mb-2">Nome do paciente</small>
          <div className="border rounded-md mb-2 w-full max-w-xs">
            <Input placeholder="Digite o nome do paciente" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border rounded-md">
            <thead className=" sticky top-0 z-10">
              <tr>
                <th className="border px-2 py-2 text-left">Remédio</th>
                <th className="border px-2 py-2 text-left">Quantidade</th>
                {horarios.map((h, idx) => (
                  <th key={idx} className="border px-2 py-2 text-center">
                    {minutesToTime(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: quantidade }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <Td classe="border px-2 py-2" />
                  <Td classe="border px-2 py-2" />
                  {horarios.map((h, i) => (
                    <Td key={i} classe="border px-2 py-2 text-center" />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
