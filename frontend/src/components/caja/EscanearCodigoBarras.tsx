import { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";

import Button from "../ui/Button";
import { X } from "lucide-react";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  onDetectado: (codigo: string) => void;
}

function EscanerCodigoBarras({
  abierto,
  onCerrar,
  onDetectado,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlesRef = useRef<IScannerControls | null>(null);
  const detectadoRef = useRef(false);

  const [error, setError] = useState("");
  const [iniciando, setIniciando] = useState(true);

  useEffect(() => {
    if (!abierto) return;

    let desmontado = false;

    const iniciarCamara = async () => {
      setError("");
      setIniciando(true);
      detectadoRef.current = false;

      try {
        const lector = new BrowserMultiFormatReader();

        const dispositivos =
          await BrowserMultiFormatReader.listVideoInputDevices();

        if (desmontado) return;

        if (dispositivos.length === 0) {
          setError("No se encontró ninguna cámara disponible.");
          setIniciando(false);
          return;
        }

        /*
         * En celulares intentamos elegir una cámara trasera.
         * Si no podemos identificarla, usamos la última disponible.
         */
        const camaraTrasera =
          dispositivos.find((dispositivo) =>
            /back|rear|environment|trasera/i.test(
              dispositivo.label
            )
          ) ?? dispositivos[dispositivos.length - 1];

        const controles =
          await lector.decodeFromVideoDevice(
            camaraTrasera.deviceId,
            videoRef.current!,
            (resultado) => {
              if (!resultado || detectadoRef.current) {
                return;
              }

              detectadoRef.current = true;

              const codigo = resultado.getText();

              controlesRef.current?.stop();
              onDetectado(codigo);
            }
          );

        if (desmontado) {
          controles.stop();
          return;
        }

        controlesRef.current = controles;
        setIniciando(false);
      } catch (error) {
        if (desmontado) return;

        console.error(error);

        setError(
          "No se pudo acceder a la cámara. Revisa los permisos del navegador."
        );

        setIniciando(false);
      }
    };

    iniciarCamara();

    return () => {
      desmontado = true;
      controlesRef.current?.stop();
      controlesRef.current = null;
    };
  }, [abierto, onDetectado]);

  if (!abierto) return null;

  const cerrar = () => {
    controlesRef.current?.stop();
    controlesRef.current = null;
    onCerrar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Cámara
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Escanear código de barras
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Coloca el código dentro del área de la cámara.
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="relative overflow-hidden rounded-xl bg-slate-950">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              muted
              playsInline
            />

            {!error && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-28 w-4/5 rounded-lg border-2 border-white/80" />
              </div>
            )}

            {iniciando && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
                <p className="text-sm font-semibold text-white">
                  Iniciando cámara...
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {!error && (
            <p className="mt-3 text-center text-xs text-slate-400">
              La lectura se realizará automáticamente.
            </p>
          )}
        </div>

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-4">
          <Button
            variant="secondary"
            onClick={cerrar}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EscanerCodigoBarras;