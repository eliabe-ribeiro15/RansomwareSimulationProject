import { useEffect, useState, useRef } from "react";
import { Lock, AlertTriangle, Timer, Bitcoin, Shield, Copy, CheckCheck } from "lucide-react";
import { motion } from "motion/react";

const G = "#22c55e";

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = 5;
  const segLen = 5;
  return Array.from({ length: segments }, () =>
    Array.from({ length: segLen }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  ).join("-");
}

function generateVictimId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase() +
    "-" +
    Date.now().toString(16).toUpperCase().slice(-6);
}

export function RansomwareScreen() {
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 45 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [filesEncrypted, setFilesEncrypted] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [copied, setCopied] = useState<"btc" | "key" | null>(null);

  const decryptKey = useRef(generateKey());
  const victimId = useRef(generateVictimId());
  const btcAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  function handleCopy(text: string, type: "btc" | "key") {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  useEffect(() => {
    const encryptInterval = setInterval(() => {
      setFilesEncrypted((prev) => {
        if (prev >= 1247) return 1247;
        return prev + Math.floor(Math.random() * 50) + 10;
      });
    }, 100);
    return () => clearInterval(encryptInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleGlitch() {
      timeout = setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 180);
        scheduleGlitch();
      }, Math.random() * 3000 + 2000);
    }
    scheduleGlitch();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const warningInterval = setInterval(() => {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }, 8000);
    return () => clearInterval(warningInterval);
  }, []);

  return (
    <div className="relative size-full bg-black overflow-hidden">
      {/* Noise background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Glitch overlay */}
      {glitchActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0] }}
          className="absolute inset-0 mix-blend-overlay pointer-events-none z-10"
          style={{ background: G }}
        />
      )}

      {/* Warning popup */}
      {showWarning && (
        <motion.div
          initial={{ scale: 0, rotate: -8, x: 20 }}
          animate={{ scale: 1, rotate: 0, x: 0 }}
          exit={{ scale: 0 }}
          className="absolute top-4 right-4 p-4 rounded-lg shadow-2xl z-50 border-2"
          style={{ background: "#14532d", borderColor: G }}
        >
          <div className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5 animate-pulse" style={{ color: G }} />
            <span className="font-bold text-sm">O TEMPO ESTÁ ACABANDO!</span>
          </div>
        </motion.div>
      )}

      <div className="size-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="p-5 flex items-center justify-between shrink-0 border-b-4"
          style={{ background: "#14532d", borderColor: "#166534" }}
        >
          <div className="flex items-center gap-4">
            <Lock className="w-10 h-10 text-white shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider leading-tight">
                SEUS ARQUIVOS FORAM CRIPTOGRAFADOS
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "#86efac" }}>
                Todos os seus documentos, fotos, bancos de dados e arquivos importantes estão bloqueados
              </p>
            </div>
          </div>
          <Shield className="w-14 h-14 animate-pulse shrink-0" style={{ color: "#166534" }} />
        </motion.div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 p-6 flex flex-col gap-5 overflow-y-auto"
          >
            {/* Countdown */}
            <div className="rounded-xl p-6 shadow-2xl border-4" style={{ background: "#052e16", borderColor: G }}>
              <div className="flex items-center gap-3 mb-5">
                <Timer className="w-7 h-7 animate-pulse" style={{ color: G }} />
                <h2 className="text-xl font-bold text-white tracking-wide">
                  TEMPO ATÉ O PREÇO DOBRAR
                </h2>
              </div>
              <div className="flex gap-4 justify-center">
                {[
                  { value: timeLeft.hours, label: "HORAS" },
                  { value: timeLeft.minutes, label: "MINUTOS" },
                  { value: timeLeft.seconds, label: "SEGUNDOS" },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-4">
                    {i > 0 && <div className="text-5xl font-mono self-center" style={{ color: G }}>:</div>}
                    <div className="text-center">
                      <div className="bg-black rounded-lg p-4 min-w-[88px] border-2" style={{ borderColor: G }}>
                        <div className={`text-5xl font-mono font-bold ${label === "SEGUNDOS" ? "animate-pulse" : ""}`} style={{ color: G }}>
                          {String(value).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="mt-1.5 text-xs font-semibold tracking-widest" style={{ color: G }}>
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Encryption status */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-950 rounded-xl p-5 border-2"
              style={{ borderColor: "#166534" }}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: G }}>
                <AlertTriangle className="w-5 h-5" />
                STATUS DA CRIPTOGRAFIA
              </h3>
              <div className="space-y-3 text-white font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Arquivos criptografados:</span>
                  <span className="font-bold" style={{ color: G }}>{filesEncrypted} / 1.247</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border" style={{ borderColor: "#166534" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(filesEncrypted / 1247) * 100}%` }}
                    className="h-full"
                    style={{ background: `linear-gradient(to right, #166534, ${G})` }}
                  />
                </div>
                <div className="pt-3 border-t border-gray-800 grid grid-cols-2 gap-1.5">
                  {[
                    "Documentos: BLOQUEADO",
                    "Fotos: BLOQUEADO",
                    "Vídeos: BLOQUEADO",
                    "Banco de dados: BLOQUEADO",
                    "E-mails: BLOQUEADO",
                    "Backups: BLOQUEADO",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: G }} />
                      <span className="text-gray-400 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What happened */}
            <div className="bg-gray-950 border-2 border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-bold text-white mb-3">O que aconteceu com meus arquivos?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Seus arquivos importantes (documentos, fotos, vídeos, bancos de dados) foram criptografados com
                criptografia militar AES-256. Sem a chave de descriptografia exclusiva, a recuperação é
                matematicamente impossível. A única forma de recuperar seus dados é adquirir o software de
                descriptografia conosco.
              </p>
            </div>
          </motion.div>

          {/* Right panel — payment */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-[460px] bg-gradient-to-b from-gray-950 to-black p-6 overflow-y-auto shrink-0 border-l-4"
            style={{ borderColor: G }}
          >
            <div className="space-y-5">
              {/* Payment box */}
              <div className="rounded-xl p-5 border-2" style={{ background: "#052e16", borderColor: G }}>
                <div className="flex items-center gap-3 mb-5">
                  <Bitcoin className="w-9 h-9 text-yellow-500" />
                  <h2 className="text-xl font-bold text-white">PAGAMENTO EXIGIDO</h2>
                </div>

                {/* Amount */}
                <div className="bg-black rounded-lg p-4 mb-3 font-mono border border-gray-800">
                  <div className="text-xs text-gray-500 mb-1">Valor:</div>
                  <div className="text-3xl text-yellow-400 font-bold">0,5 BTC</div>
                  <div className="text-sm text-gray-500 mt-1">≈ R$ 118.500,00</div>
                </div>

                {/* BTC address */}
                <div className="bg-black rounded-lg p-4 mb-3 font-mono border border-gray-800">
                  <div className="text-xs text-gray-500 mb-2">Endereço Bitcoin:</div>
                  <div className="text-xs break-all leading-relaxed" style={{ color: G }}>{btcAddress}</div>
                  <button
                    onClick={() => handleCopy(btcAddress, "btc")}
                    className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {copied === "btc" ? (
                      <><CheckCheck className="w-3.5 h-3.5" style={{ color: G }} /><span style={{ color: G }}>Copiado!</span></>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" />Copiar endereço</>
                    )}
                  </button>
                </div>

                {/* Decryption key */}
                <div className="bg-black rounded-lg p-4 font-mono border border-yellow-900/50">
                  <div className="text-xs text-yellow-600 mb-1 font-semibold">⚠ CHAVE DE DESCRIPTOGRAFIA</div>
                  <div className="text-xs text-gray-500 mb-2">
                    Informe esta chave após confirmar o pagamento:
                  </div>
                  <div className="text-sm text-yellow-400 tracking-[0.2em] font-bold select-all">
                    {decryptKey.current}
                  </div>
                  <button
                    onClick={() => handleCopy(decryptKey.current, "key")}
                    className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {copied === "key" ? (
                      <><CheckCheck className="w-3.5 h-3.5" style={{ color: G }} /><span style={{ color: G }}>Copiado!</span></>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" />Copiar chave</>
                    )}
                  </button>
                </div>
              </div>

              {/* Warnings */}
              <div className="bg-gray-950 border-2 border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-bold mb-3" style={{ color: G }}>⚠ AVISOS IMPORTANTES</h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    "NÃO desligue o computador. Os arquivos serão excluídos permanentemente.",
                    "NÃO tente descriptografar os arquivos sozinho. Eles serão corrompidos.",
                    "NÃO delete este programa ou a descriptografia será impossível.",
                    "Você tem 48 horas para pagar. Após isso, o valor DOBRA.",
                    "Após 7 dias, sua chave de descriptografia será destruída para sempre.",
                  ].map((w) => (
                    <li key={w} className="flex gap-2 text-gray-300">
                      <span className="font-bold shrink-0" style={{ color: G }}>•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full text-white font-bold py-4 px-6 rounded-xl border-2 shadow-lg transition-all duration-200 tracking-wide"
                style={{ background: G, borderColor: "#16a34a" }}
              >
                QUERO PAGAR AGORA
              </motion.button>

              <div className="text-center text-gray-600 text-xs font-mono space-y-0.5">
                <div>ID DA VÍTIMA: {victimId.current}</div>
                <div>CRIPTOGRAFIA: AES-256-CBC + RSA-4096</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black border-t-2 p-3 text-center shrink-0"
          style={{ borderColor: "#166534" }}
        >
          <p className="font-mono text-sm animate-pulse tracking-widest" style={{ color: G }}>
            🔒 SEU COMPUTADOR ESTÁ BLOQUEADO 🔒
          </p>
        </motion.div>
      </div>
    </div>
  );
}
