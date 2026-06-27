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
    from: "financeiro@parceiros-corp.com.br",
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
    from: "rh@empresa.com",
    subject: "Benefícios 2025 - Documentação necessária",
    preview: "Olá! Para renovação dos seus benefícios precisamos que você...",
    time: "08:30",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: true,
    body: "Olá! Para renovação dos seus benefícios precisamos que você envie a documentação até sexta-feira.",
  },
  {
    id: 3,
    from: "suporte@banco-seguro.com",
    subject: "Ação necessária: Confirme sua conta",
    preview: "Detectamos uma atividade suspeita na sua conta. Por favor...",
    time: "07:55",
    unread: true,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: "Detectamos uma atividade suspeita. Confirme seus dados.",
  },
  {
    id: 4,
    from: "newsletter@techdigest.io",
    subject: "As 10 tendências de TI para 2025",
    preview: "Inteligência artificial, edge computing e muito mais...",
    time: "Ontem",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: "Confira as principais tendências de tecnologia para o próximo ano.",
  },
  {
    id: 5,
    from: "pedro.silva@empresa.com",
    subject: "Re: Reunião de alinhamento - terça",
    preview: "Pode ser às 14h? Tenho uma call antes mas termino às...",
    time: "Ontem",
    unread: false,
    hasAttachment: false,
    attachment: null,
    starred: false,
    body: "Pode ser às 14h? Tenho uma call antes mas termino às 13h45.",
  },
];

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
    <div className="size-full flex flex-col bg-gray-100 font-sans overflow-hidden">
      {/* Top bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-sm">CorpMail Pro</span>
        </div>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-9 pr-4 py-1.5 bg-gray-100 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-400"
              placeholder="Pesquisar e-mails..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setShowNotification(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {!notifDismissed && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CS
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">Carlos Silva</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-52 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === key
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{label}</span>
                {count > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200 space-y-0.5">
            {[
              { icon: FolderOpen, label: "Arquivos" },
              { icon: Users, label: "Contatos" },
              { icon: BarChart2, label: "Relatórios" },
              { icon: Settings, label: "Configurações" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <span className="font-semibold text-gray-800 text-sm">
              {activeSection === "inbox"
                ? "Caixa de entrada"
                : activeSection === "starred"
                ? "Favoritos"
                : "Enviados"}
            </span>
            <span className="text-xs text-gray-400">{filtered.length} mensagens</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors relative ${
                  selectedEmail?.id === email.id ? "bg-blue-50" : ""
                } ${email.unread ? "bg-blue-50/40" : ""}`}
              >
                {email.unread && (
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <span
                    className={`text-sm truncate ${
                      email.unread ? "font-semibold text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {email.from.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">{email.time}</span>
                </div>
                <div className={`text-sm truncate mb-0.5 ${email.unread ? "font-medium text-gray-800" : "text-gray-600"}`}>
                  {email.subject}
                </div>
                <div className="text-xs text-gray-400 truncate flex items-center gap-1">
                  {email.hasAttachment && <Paperclip className="w-3 h-3" />}
                  {email.preview}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email body */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedEmail ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {selectedEmail.from[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{selectedEmail.from}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Hoje às {selectedEmail.time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                    {selectedEmail.body}
                  </pre>

                  {selectedEmail.hasAttachment && selectedEmail.attachment && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
                        Anexo
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">
                            {selectedEmail.attachment}
                          </div>
                          <div className="text-xs text-gray-400">PDF · 284 KB</div>
                        </div>
                        {!downloading ? (
                          <button
                            onClick={handleOpenAttachment}
                            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Abrir
                          </button>
                        ) : (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-blue-600 font-medium">
                              {downloadProgress < 100 ? "Abrindo..." : "Executando..."}
                            </span>
                            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 transition-all duration-100"
                                style={{ width: `${Math.min(downloadProgress, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {downloading && downloadProgress < 100 && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
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
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-gray-500 text-sm">Selecione um e-mail para ler</p>
              <p className="text-gray-400 text-xs mt-1">Você tem 2 mensagens não lidas</p>
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
            className="fixed bottom-5 right-5 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-500 mb-0.5">Novo e-mail — URGENTE</div>
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {urgentEmail.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-0.5">{urgentEmail.preview}</div>
                </div>
                <button
                  onClick={() => setNotifDismissed(true)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
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
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
                >
                  Abrir e-mail
                </button>
                <button
                  onClick={() => setNotifDismissed(true)}
                  className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium py-1.5 rounded-lg transition-colors"
                >
                  Ignorar
                </button>
              </div>
            </div>
            <div className="h-1 bg-blue-600 animate-[shrink_6s_linear_forwards]" />
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
