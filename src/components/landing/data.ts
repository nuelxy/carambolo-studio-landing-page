import {
  CalendarCheck,
  Check,
  Compass,
  Disc3,
  GalleryHorizontal,
  Headphones,
  MapPin,
  Mic,
  Music2,
  Radio,
  Sliders,
  Sparkles,
  Users,
  Video,
  Volume2,
} from "lucide-react";

export const navigationLinks = [
  { href: "#gravacao", label: "Gravação" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#avaliacao", label: "Avaliação" },
  { href: "#materiais", label: "Materiais" },
  { href: "#faq", label: "FAQ" },
];

export const serviceCards = [
  {
    icon: Mic,
    title: "Captação de voz",
    desc: "Sessões vocais com direção técnica, preparo de tomada e cuidado com interpretação.",
  },
  {
    icon: Music2,
    title: "Instrumentos",
    desc: "Captação de violão, guitarra, baixo, bateria e instrumentos conforme a necessidade do arranjo.",
  },
  {
    icon: Users,
    title: "Banda e live session",
    desc: "Registro de banda, ensaio gravado ou performance com planejamento de captação.",
  },
  {
    icon: Disc3,
    title: "Single, EP ou álbum",
    desc: "Acompanhamento para gravar uma música ou organizar etapas de um projeto maior.",
  },
  {
    icon: Sliders,
    title: "Edição, mix e master",
    desc: "Finalização técnica do áudio conforme o escopo aprovado para cada projeto.",
  },
  {
    icon: Sparkles,
    title: "Produção musical",
    desc: "Orientação de arranjo, estrutura e estética quando a música ainda precisa tomar forma.",
  },
  {
    icon: Headphones,
    title: "Podcast e voz",
    desc: "Captação de áudio para podcasts, locuções, entrevistas e conteúdos falados.",
  },
  {
    icon: Radio,
    title: "Jingle e institucional",
    desc: "Áudio para marcas, campanhas e projetos que precisam de direção sonora.",
  },
];

export const processSteps = [
  [
    "01",
    "Você solicita a avaliação",
    "Preenche o formulário ou chama no WhatsApp com as primeiras informações do projeto.",
  ],
  [
    "02",
    "O produtor entende a música",
    "A conversa identifica se você precisa de captação, produção, edição, mixagem ou masterização.",
  ],
  [
    "03",
    "O escopo fica claro",
    "Você recebe orientação sobre o formato de gravação mais adequado antes de agendar.",
  ],
  [
    "04",
    "A sessão é preparada",
    "Referências, instrumentos, guia, horários e necessidades técnicas são alinhados.",
  ],
  [
    "05",
    "A gravação acontece",
    "A sessão conta com acompanhamento técnico para performance, captação e tomada de decisão.",
  ],
  [
    "06",
    "O áudio segue para finalização",
    "O material passa pelas etapas combinadas até a entrega dos arquivos finais.",
  ],
];

export const recordingReasons = [
  "Gravar uma música autoral ou cover com escopo definido.",
  "Registrar voz, instrumento ou banda com direção durante a sessão.",
  "Transformar guia, rascunho ou ideia inicial em uma gravação orientada.",
  "Preparar material para lançamento, portfólio, edital, festival ou apresentação.",
];

export const differentials = [
  {
    icon: Compass,
    title: "Direção técnica na sessão",
    desc: "Você recebe orientação para execução, captação e escolhas práticas durante a gravação.",
  },
  {
    icon: Volume2,
    title: "Foco no som que a música pede",
    desc: "O processo parte do projeto, das referências e do estágio real da música.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamento com preparo",
    desc: "Antes de gravar, o estúdio alinha formato, tempo, arquivos e necessidades da sessão.",
  },
  {
    icon: Check,
    title: "Escopo sem promessa mágica",
    desc: "O orçamento e a entrega dependem do material, prazo, captação e etapas contratadas.",
  },
];

export const materialPlaceholders = [
  {
    icon: GalleryHorizontal,
    title: "Fotos reais do estúdio",
    desc: "Placeholder para inserir fotos atuais de salas, microfones, instrumentos e bastidores.",
  },
  {
    icon: Video,
    title: "Portfólio e galeria",
    desc: "Placeholder para músicas, vídeos, live sessions ou trechos autorizados pelos artistas.",
  },
  {
    icon: Users,
    title: "Depoimentos reais",
    desc: "Placeholder para avaliações verificadas de clientes, sem nomes ou resultados inventados.",
  },
  {
    icon: MapPin,
    title: "Avaliações públicas",
    desc: "Placeholder para prints ou embeds de avaliações reais quando o cliente fornecer o material.",
  },
];

export const faqs = [
  [
    "Preciso ter experiência para gravar?",
    "Não. A avaliação inicial serve para entender o estágio da música e orientar os próximos passos.",
  ],
  [
    "Quanto custa gravar uma música?",
    "Depende do escopo. Captação, instrumentos, produção, edição, mixagem, masterização e prazo influenciam o orçamento.",
  ],
  [
    "A mixagem e a masterização estão incluídas?",
    "Depende do pacote definido para o projeto. Isso deve ficar claro antes do agendamento.",
  ],
  [
    "Posso levar minha banda?",
    "Sim, desde que o formato seja alinhado antes para definir tempo, captação e estrutura necessária.",
  ],
  [
    "O arquivo final fica pronto para distribuição?",
    "O estúdio pode entregar arquivos em formatos adequados e orientar os próximos passos, conforme o escopo contratado.",
  ],
  [
    "Onde fica o Carambolo Studio?",
    "Av. Fernando Pires Leal, 3901, Recanto das Palmeiras, Teresina/PI. Atendimento sob agendamento.",
  ],
];
