import { useState, useEffect, useRef } from "react";
import { RansomwareScreen } from "./components/RansomwareScreen";
import {
  FileText,
  Download,
  Mail,
  Bell,
  Search,
  ChevronRight,
  Paperclip,
  Star,
  Inbox,
  Send,
  Trash2,
  AlertCircle,
  X,
  Home,
  FolderOpen,
  Settings,
  Users,
  BarChart2,
  Shield,
  LogOut,
  Eye,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Phase = "normal" | "infecting" | "ransomware";

const FAKE_EMAILS = [
  {
    id: 1,
    from: "r@parceiros-corp.com.br",
    subject: "URGENTE: Fatura #INV-2024-8821 em atraso",
    preview: "Prezado cliente, segue em anexo a fatura referente ao mês de...",
    time: "09:14",
    unread: true,
    hasAttachment: true,
    attachment: "Fatura_INV-2024-8821.pdf.exe",
    starred: false,
    body: `Prezado(a),

Segue em anexo a fatura #INV-2024-8821 referente aos serviços prestados no período de novembro/2024.

O vencimento é HOJE. Para evitar juros e multa, realize o pagamento imediatamente.

⚠️ IMPORTANTE: Abra o arquivo em anexo para visualizar o boleto de pagamento.

Atenciosamente,
Departamento Financeiro
Parceiros Corp Ltda.`,
  },
  {
    id: 2,
    from: "r@empresa.com",
    subject: "RANSOMWARE",
    preview: "",
    time: "08:30",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: true,
    body: `⚠️ Ameaça Adicional 📂

As versões mais modernas de ransomware não apenas criptografam os arquivos, mas também roubam (exfiltram) dados confidenciais 📤 antes de bloquear o sistema. Em seguida, os criminosos ameaçam divulgar ou vender essas informações sigilosas 🌐🔓 caso o resgate não seja pago 💸, aumentando a pressão sobre a vítima e os riscos de prejuízos financeiros e de reputação. 🚨`,
  },
  {
    id: 3,
    from: "r@banco-seguro.com",
    subject: "RANSOMWARE",
    preview: "",
    time: "07:55",
    unread: true,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: `💰 Pedido de Resgate 🚨

Após concluir a criptografia dos arquivos, o ransomware exibe uma mensagem de aviso 📢 informando que os dados foram bloqueados. Os criminosos exigem o pagamento de um resgate 💸, geralmente em criptomoedas 🪙, prometendo fornecer a chave de descriptografia 🗝️ para restaurar o acesso aos arquivos. Mesmo com o pagamento, não há garantia de que os dados serão recuperados. ⚠️`,
  },
  {
    id: 4,
    from: "r@techdigest.io",
    subject: "RANSOMWARE",
    preview: "",
    time: "Ontem",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: `⚙️ Execução e Criptografia 🔐

Após a infecção, o malware é executado automaticamente e começa a criptografar arquivos e pastas importantes 📂 do dispositivo. Esse processo torna os dados inacessíveis 🚫, impedindo que a vítima abra documentos, fotos ou outros arquivos sem a chave de descriptografia 🗝️, que normalmente fica em posse dos criminosos. ⚠️`,
  },
  {
    id: 5,
    from: "r@ransomware.com",
    subject: "RANSOMWARE",
    preview: "",
    time: "Ontem",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: `🔒 COMO FUNCIONA O ATAQUE DE RANSOMWARE

🦠 Infecção: O ataque geralmente começa quando o criminoso consegue acesso ao dispositivo por meio de e-mails de phishing 📧, sites infectados 🌐, downloads maliciosos 📥 ou pela exploração de vulnerabilidades em softwares desatualizados 💻. Após a infecção, o ransomware é executado silenciosamente e pode começar a criptografar os arquivos da vítima. 🔐`,
  },
];

function renderSubject(subject: string, className?: string) {
  if (subject === "RANSOMWARE") {
    return <span className={className} style={{ color: "#ef4444" }}>RANSOMWARE</span>;
  }
  return <span className={className}>{subject}</span>;
}

function NormalWebsite({ onInfect }: { onInfect: () => void }) {
  const [selectedEmail, setSelectedEmail] = useState<(typeof FAKE_EMAILS)[0] | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notifDismissed, setNotifDismissed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<"inbox" | "sent" | "starred">("inbox");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      if (!notifDismissed) setShowNotification(true);
    }, 2500);
    return () => clearTimeout(t);
  }, [notifDismissed]);

  function handleOpenAttachment() {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onInfect(), 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 120);
  }

  const filtered = FAKE_EMAILS.filter((e) => {
    if (activeSection === "starred") return e.starred;
    return true;
  }).filter(
    (e) =>
      searchValue === "" ||
      e.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.from.toLowerCase().includes(searchValue.toLowerCase())
  );

  const urgentEmail = FAKE_EMAILS[0];

  return (
    <div className="size-full flex flex-col font-sans overflow-hidden" style={{ background: "#0f1117" }}>
      {/* Top bar */}
      <div className="h-14 flex items-center px-4 gap-4 shrink-0 z-10" style={{ background: "#161b22", borderBottom: "1px solid #21262d" }}>
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#22c55e" }}>
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">TDS CORP</span>
        </div>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8b949e" }} />
            <input
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg focus:outline-none"
              style={{ background: "#21262d", border: "1px solid #30363d", color: "#e6edf3" }}
              placeholder="Pesquisar e-mails..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setShowNotification(true)}
            className="relative p-2 rounded-full transition-colors"
            style={{ color: "#8b949e" }}
          >
            <Bell className="w-5 h-5" />
            {!notifDismissed && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <div className="flex items-center gap-2 pl-3" style={{ borderLeft: "1px solid #30363d" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#22c55e" }}>
              2TDS
            </div>
            <span className="text-sm hidden sm:block" style={{ color: "#e6edf3" }}>2 TDS</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-52 flex flex-col shrink-0" style={{ background: "#161b22", borderRight: "1px solid #21262d" }}>
          <div className="p-3">
            <button
              className="w-full text-white rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              style={{ background: "#22c55e" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#16a34a")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#22c55e")}
            >
              <span className="text-lg leading-none">+</span> Novo e-mail
            </button>
          </div>
          <nav className="flex-1 px-2 space-y-0.5">
            {[
              { icon: Inbox, label: "Caixa de entrada", key: "inbox", count: 2 },
              { icon: Star, label: "Favoritos", key: "starred", count: 0 },
              { icon: Send, label: "Enviados", key: "sent", count: 0 },
              { icon: Trash2, label: "Lixeira", key: "trash", count: 0 },
            ].map(({ icon: Icon, label, key, count }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as typeof activeSection)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                style={
                  activeSection === key
                    ? { background: "#1a3a2a", color: "#22c55e", fontWeight: 600 }
                    : { color: "#8b949e" }
                }
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{label}</span>
                {count > 0 && (
                  <span className="text-white text-xs rounded-full px-1.5 py-0.5" style={{ background: "#22c55e" }}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="p-3 space-y-0.5" style={{ borderTop: "1px solid #21262d" }}>
            {[
              { icon: FolderOpen, label: "Arquivos" },
              { icon: Users, label: "Contatos" },
              { icon: BarChart2, label: "Relatórios" },
              { icon: Settings, label: "Configurações" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: "#8b949e" }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="w-80 flex flex-col shrink-0" style={{ background: "#0d1117", borderRight: "1px solid #21262d" }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #21262d" }}>
            <span className="font-semibold text-white text-sm">
              {activeSection === "inbox" ? "Caixa de entrada" : activeSection === "starred" ? "Favoritos" : "Enviados"}
            </span>
            <span className="text-xs" style={{ color: "#8b949e" }}>{filtered.length} mensagens</span>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ divideColor: "#21262d" }}>
            {filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className="w-full text-left px-4 py-3 transition-colors relative"
                style={{
                  borderBottom: "1px solid #21262d",
                  background: selectedEmail?.id === email.id
                    ? "#1a2a1a"
                    : email.unread
                    ? "#0d1f12"
                    : "transparent",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5" style={{ background: "#22c55e" }}>
                    R
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="text-sm truncate font-bold" style={{ color: "#ef4444" }}>
                        R
                      </span>
                      <span className="text-xs shrink-0" style={{ color: "#8b949e" }}>{email.time}</span>
                    </div>
                    <div className="text-sm truncate mb-0.5" style={{ fontWeight: email.unread ? 500 : 400, color: email.unread ? "#c9d1d9" : "#6e7681" }}>
                      {renderSubject(email.subject)}
                    </div>
                    <div className="text-xs truncate flex items-center gap-1" style={{ color: "#6e7681" }}>
                      {email.hasAttachment && <Paperclip className="w-3 h-3" />}
                      {email.preview}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email body */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0d1117" }}>
          {selectedEmail ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {renderSubject(selectedEmail.subject)}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#ef4444" }}>
                      R
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: "#ef4444" }}>R</div>
                      <div className="text-xs flex items-center gap-1" style={{ color: "#8b949e" }}>
                        <Clock className="w-3 h-3" />
                        Hoje às {selectedEmail.time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-6" style={{ background: "#161b22", border: "1px solid #21262d" }}>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans" style={{ color: "#c9d1d9" }}>
                    {selectedEmail.body}
                  </pre>

                  {selectedEmail.hasAttachment && selectedEmail.attachment && (
                    <div className="mt-6 pt-4" style={{ borderTop: "1px solid #21262d" }}>
                      <div className="text-xs font-medium mb-3 uppercase tracking-wide" style={{ color: "#8b949e" }}>
                        Anexo
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg group transition-colors" style={{ background: "#0d1117", border: "1px solid #30363d" }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#1a1a2e" }}>
                          <FileText className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate text-white">
                            {selectedEmail.attachment}
                          </div>
                          <div className="text-xs" style={{ color: "#8b949e" }}>PDF · 284 KB</div>
                        </div>
                        {!downloading ? (
                          <button
                            onClick={handleOpenAttachment}
                            className="flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                            style={{ background: "#22c55e" }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Abrir
                          </button>
                        ) : (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-medium" style={{ color: "#22c55e" }}>
                              {downloadProgress < 100 ? "Abrindo..." : "Executando..."}
                            </span>
                            <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "#21262d" }}>
                              <div
                                className="h-full transition-all duration-100"
                                style={{ width: `${Math.min(downloadProgress, 100)}%`, background: "#22c55e" }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {downloading && downloadProgress < 100 && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Verificando arquivo com antivírus...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#1a2a1a" }}>
                <Mail className="w-8 h-8" style={{ color: "#22c55e" }} />
              </div>
              <p className="text-sm" style={{ color: "#8b949e" }}>Selecione um e-mail para ler</p>
              <p className="text-xs mt-1" style={{ color: "#6e7681" }}>Você tem 2 mensagens não lidas</p>
            </div>
          )}
        </div>
      </div>

      {/* Popup notification */}
      <AnimatePresence>
        {showNotification && !notifDismissed && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-5 right-5 w-80 rounded-xl shadow-2xl overflow-hidden z-50"
            style={{ background: "#161b22", border: "1px solid #21262d" }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#1a2a1a" }}>
                  <Mail className="w-4 h-4" style={{ color: "#22c55e" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "#8b949e" }}>Novo e-mail — URGENTE</div>
                  <div className="text-sm font-semibold truncate text-white">
                    {urgentEmail.subject}
                  </div>
                  <div className="text-xs truncate mt-0.5" style={{ color: "#8b949e" }}>{urgentEmail.preview}</div>
                </div>
                <button
                  onClick={() => setNotifDismissed(true)}
                  style={{ color: "#6e7681" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setSelectedEmail(urgentEmail);
                    setNotifDismissed(true);
                  }}
                  className="flex-1 text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
                  style={{ background: "#22c55e" }}
                >
                  Abrir e-mail
                </button>
                <button
                  onClick={() => setNotifDismissed(true)}
                  className="flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors"
                  style={{ border: "1px solid #30363d", color: "#8b949e" }}
                >
                  Ignorar
                </button>
              </div>
            </div>
            <div className="h-1 animate-[shrink_6s_linear_forwards]" style={{ background: "#22c55e" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfectionOverlay({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [scanLines, setScanLines] = useState<number[]>([]);

  const STEPS = [
    "Iniciando processo...",
    "Injetando payload...",
    "Escalando privilégios...",
    "Desabilitando antivírus...",
    "Mapeando sistema de arquivos...",
    "Iniciando criptografia AES-256...",
    "Conectando ao servidor C2...",
  ];

  useEffect(() => {
    const lines = Array.from({ length: 20 }, (_, i) => Math.random() * 100);
    setScanLines(lines);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < STEPS.length) {
        setStep(i);
      } else {
        clearInterval(interval);
        setTimeout(onDone, 600);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center overflow-hidden"
    >
      {/* scan lines */}
      {scanLines.map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-red-500/30"
          style={{ top: `${top}%` }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Glitch horizontal bars */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      >
        {[10, 35, 60, 80].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-red-500"
            style={{ top: `${top}%`, height: `${Math.random() * 4 + 1}px`, opacity: 0.3 }}
          />
        ))}
      </motion.div>

      <div className="text-center space-y-6 z-10 px-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto"
        />
        <div className="font-mono text-red-500 text-lg font-bold tracking-widest">
          SISTEMA COMPROMETIDO
        </div>
        <div className="space-y-1">
          {STEPS.slice(0, step + 1).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-xs text-green-400 text-left max-w-xs mx-auto"
            >
              <span className="text-green-600 mr-2">[OK]</span>
              {s}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>("normal");

  return (
    <div className="size-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "normal" && (
          <motion.div
            key="normal"
            className="size-full"
            exit={{ filter: "blur(8px) brightness(2)", scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <NormalWebsite onInfect={() => setPhase("infecting")} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "infecting" && (
        <>
          <div className="size-full">
            <NormalWebsite onInfect={() => {}} />
          </div>
          <InfectionOverlay onDone={() => setPhase("ransomware")} />
        </>
      )}

      <AnimatePresence>
        {phase === "ransomware" && (
          <motion.div
            key="ransomware"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <RansomwareScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
