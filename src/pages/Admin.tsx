import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Settings, Package, BookOpen, Users, MessageSquare, HelpCircle, Image, LayoutDashboard, LogOut, Plus, Trash2, Save, GripVertical } from 'lucide-react';

const panel = 'bg-[#0d1117] border-white/10 text-zinc-100';
const input = 'bg-zinc-900 border-white/15 text-zinc-100 placeholder:text-zinc-500 h-11';
const textarea = 'w-full rounded-md border border-white/15 bg-zinc-900 text-zinc-100 p-3 outline-none focus:border-white/30';
const btnPrimary = 'bg-white text-black hover:bg-zinc-200 font-semibold';
const btnOutline = 'border border-white/20 bg-transparent text-zinc-100 hover:bg-white/10';

const toLines = (v) => Array.isArray(v) ? v.join('\n') : '';
const fromLines = (v) => String(v || '').split('\n').map((s) => s.trim()).filter(Boolean);
const num = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;
const id = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const toDataUrl = (file) => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file); });

const DEFAULT_BEFORE_AFTER = [
  {
    id: 'default-case-1',
    title_pt: 'Case 01',
    title_en: 'Case 01',
    description_pt: '',
    description_en: '',
    order: 0,
    before_url: '/beforeafter/case1-before.jpg',
    during_url: '/beforeafter/case1-during.jpg',
    after_url: '/beforeafter/case1-after.jpg',
  },
  {
    id: 'default-case-2',
    title_pt: 'Case 02',
    title_en: 'Case 02',
    description_pt: '',
    description_en: '',
    order: 1,
    before_url: '/beforeafter/case2-before.jpg',
    during_url: '/beforeafter/case2-during.jpg',
    after_url: '/beforeafter/case2-after.jpg',
  },
  {
    id: 'default-case-3',
    title_pt: 'Case 03',
    title_en: 'Case 03',
    description_pt: '',
    description_en: '',
    order: 2,
    before_url: '/beforeafter/case3-before.jpg',
    during_url: '/beforeafter/case3-during.jpg',
    after_url: '/beforeafter/case3-after.jpg',
  },
];

const normalizeBeforeAfter = (item, index = 0) => ({
  ...item,
  id: item?.id || id(),
  title_pt: item?.title_pt || '',
  title_en: item?.title_en || '',
  description_pt: item?.description_pt || '',
  description_en: item?.description_en || '',
  order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
  before_url: item?.before_url || item?.before_image_url || '',
  during_url: item?.during_url || item?.during_image_url || item?.before_url || item?.before_image_url || '',
  after_url: item?.after_url || item?.after_image_url || '',
});

const toBeforeAfterPayload = (item) => ({
  ...item,
  order: num(item?.order, 0),
  before_url: item?.before_url || '',
  during_url: item?.during_url || '',
  after_url: item?.after_url || '',
  // compatibilidade
  before_image_url: item?.before_url || '',
  during_image_url: item?.during_url || '',
  after_image_url: item?.after_url || '',
});

const DEFAULT_MODULES = [
  { id: 'module-seed-1', title_pt: 'Apresentacao', title_en: 'Introduction', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Visao geral do curso e da jornada de aprendizado' }, { id: id(), title: 'Metodologia pratica e progressiva' }, { id: id(), title: 'O que esperar ao longo dos modulos' }], order: 0 },
  { id: 'module-seed-2', title_pt: 'Project Manager', title_en: 'Project Manager', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Estrutura profissional de organizacao no DaVinci' }, { id: id(), title: 'Configuracao da Biblioteca e Database' }, { id: id(), title: 'Protecao contra perda de dados' }, { id: id(), title: 'Fluxo de trabalho escalavel e limpo' }], order: 1 },
  { id: 'module-seed-3', title_pt: 'Conform', title_en: 'Conform', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Importacao correta do projeto de outros softwares' }, { id: id(), title: 'Preparacao de timeline para grading' }, { id: id(), title: 'Conform com Adobe Premiere' }], order: 2 },
  { id: 'module-seed-4', title_pt: 'Personalizacoes e Atalhos', title_en: 'Customizations and Shortcuts', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Atalhos essenciais para agilidade' }, { id: id(), title: 'Configuracoes personalizadas' }, { id: id(), title: 'Otimizacao de performance' }, { id: id(), title: 'Fluidez no dia a dia de pos-producao' }], order: 3 },
  { id: 'module-seed-5', title_pt: 'Interface do Resolve', title_en: 'Resolve Interface', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Tour pela aba Color' }, { id: id(), title: 'Ferramentas essenciais do colorista' }, { id: id(), title: 'Navegacao eficiente' }, { id: id(), title: 'Aba Edit: o essencial para um colorista' }], order: 4 },
  { id: 'module-seed-6', title_pt: 'Gerenciamento de Cor Basico', title_en: 'Basic Color Management', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Uma breve introducao ao gerenciamento de cor' }, { id: id(), title: 'Diferentes espacos de cor' }, { id: id(), title: 'Utilizando transformacoes de maneira eficiente' }], order: 5 },
  { id: 'module-seed-7', title_pt: 'Primaries, Scopes e Color Matching', title_en: 'Primaries, Scopes and Color Matching', lessons_count: 6, duration_hours: 1, topics: [{ id: id(), title: 'Conceitos do Color Balance' }, { id: id(), title: 'Entendendo as ferramentas primarias' }, { id: id(), title: 'Como interpretar os Scopes' }, { id: id(), title: 'Printer Lights' }, { id: id(), title: 'HDR Color Wheels' }, { id: id(), title: 'Color Matching' }], order: 6 },
  { id: 'module-seed-8', title_pt: 'Gerenciamento de Cor Avancado', title_en: 'Advanced Color Management', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'DaVinci YRGB, ACES e DWG' }, { id: id(), title: 'Entendendo o Camera Raw' }, { id: id(), title: 'Gerenciamento a nivel de Nodes' }], order: 7 },
  { id: 'module-seed-9', title_pt: 'Nodes e Workflow', title_en: 'Nodes and Workflow', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Tipos de nodes e aplicacoes estrategicas' }, { id: id(), title: 'Construcao de Node Tree profissional' }, { id: id(), title: 'Workflow escalavel e organizado' }], order: 8 },
  { id: 'module-seed-10', title_pt: 'Ferramentas Secundarias', title_en: 'Secondary Tools', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Uso avancado de Power Windows e Qualifiers' }, { id: id(), title: 'Curves, Warper e Noise Reduction' }, { id: id(), title: 'Magic Mask e Color Slice' }, { id: id(), title: 'Refino tecnico e estetico da imagem' }], order: 9 },
  { id: 'module-seed-11', title_pt: 'Skin Tones', title_en: 'Skin Tones', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Correcao de diferentes tipos de pele' }, { id: id(), title: 'Uso do Vectorscope para precisao' }, { id: id(), title: 'Tecnicas de realce com Glow e Beauty' }, { id: id(), title: 'Resultados cinematograficos e naturais' }], order: 10 },
  { id: 'module-seed-12', title_pt: 'Pratica - Color Balance & Matching', title_en: 'Practice - Color Balance & Matching', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Exercicio pratico com multiplos takes' }, { id: id(), title: 'Consistencia entre diferentes cameras e luzes' }, { id: id(), title: 'Ajuste fino de contraste e exposicao' }, { id: id(), title: 'Desenvolvimento do olhar tecnico' }], order: 11 },
  { id: 'module-seed-13', title_pt: 'Criacao de Look', title_en: 'Look Creation', lessons_count: 5, duration_hours: 1, topics: [{ id: id(), title: 'Uso de LUTs tecnicos e criativos' }, { id: id(), title: 'Introducao a FPE e workflows com Cineon' }, { id: id(), title: 'Entendendo a utilizacao do Grao Analogico' }, { id: id(), title: 'Halation: Tecnicas avancadas' }, { id: id(), title: 'Construcao de looks com identidade visual' }], order: 12 },
  { id: 'module-seed-14', title_pt: 'Projeto Pratico 01', title_en: 'Practical Project 01', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Grading completo do inicio ao fim' }, { id: id(), title: 'Correcao primaria, secundaria e look' }, { id: id(), title: 'Consolidacao do workflow' }, { id: id(), title: 'Projeto guiado com aplicacao real' }], order: 13 },
  { id: 'module-seed-15', title_pt: 'Projeto Pratico 02', title_en: 'Practical Project 02', lessons_count: 4, duration_hours: 1, topics: [{ id: id(), title: 'Continuacao da timeline do Modulo 03' }, { id: id(), title: 'Grading completo de um novo material' }, { id: id(), title: 'Exercicio de autonomia e tomada de decisao' }, { id: id(), title: 'Experiencia de projeto real completo' }], order: 14 },
  { id: 'module-seed-16', title_pt: 'Deliver e Conform Final', title_en: 'Final Deliver and Conform', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Diferentes metodos de Render' }, { id: id(), title: 'Como usar Individual Clips e Handles' }, { id: id(), title: 'Entregas profissionais e organizadas' }], order: 15 },
];

const normalizeModule = (item, index = 0) => {
  const topicsFromLessons = [
    ...(Array.isArray(item?.lessons_pt) ? item.lessons_pt : []),
    ...(Array.isArray(item?.lessons_en) ? item.lessons_en : []),
  ]
    .map((title) => String(title || '').trim())
    .filter(Boolean)
    .map((title) => ({ id: id(), title }));

  const topics =
    Array.isArray(item?.topics) && item.topics.length > 0
      ? item.topics.map((t) => ({ id: t?.id || id(), title: String(t?.title || '').trim() })).filter((t) => t.title)
      : topicsFromLessons;

  return {
    ...item,
    id: item?.id || id(),
    title_pt: String(item?.title_pt || item?.name_pt || `Modulo ${index + 1}`).trim(),
    title_en: String(item?.title_en || item?.name_en || item?.title_pt || `Module ${index + 1}`).trim(),
    description_pt: String(item?.description_pt || '').trim(),
    description_en: String(item?.description_en || '').trim(),
    lessons_count: Math.max(0, num(item?.lessons_count, topics.length)),
    duration_hours: Math.max(0, num(item?.duration_hours, 0)),
    topics,
    order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
  };
};

const toModulePayload = (item, index) => ({
  ...item,
  id: item?.id || id(),
  title_pt: String(item?.title_pt || '').trim(),
  title_en: String(item?.title_en || '').trim(),
  description_pt: String(item?.description_pt || '').trim(),
  description_en: String(item?.description_en || '').trim(),
  lessons_count: Math.max(0, num(item?.lessons_count, 0)),
  duration_hours: Math.max(0, num(item?.duration_hours, 0)),
  topics: Array.isArray(item?.topics)
    ? item.topics
        .map((t) => ({ id: t?.id || id(), title: String(t?.title || '').trim() }))
        .filter((t) => t.title)
    : [],
  order: index,
});

function H({ title, desc, icon: Icon }) {
  return <div className="mb-4"><div className="flex items-center gap-2 mb-1">{Icon ? <Icon className="w-5 h-5" /> : null}<h2 className="text-2xl font-bold">{title}</h2></div><p className="text-zinc-400 text-sm">{desc}</p></div>;
}

function F({ label, ...props }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><Input className={input} {...props} /></div>;
}

function T({ label, value, onChange, rows = 3 }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><textarea rows={rows} value={value || ''} onChange={onChange} className={textarea} /></div>;
}

function BI({ label, pt, en, setPt, setEn }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="PT" value={pt || ''} onChange={(e) => setPt(e.target.value)} /><F label="EN" value={en || ''} onChange={(e) => setEn(e.target.value)} /></div></div>;
}

function BT({ label, pt, en, setPt, setEn, rows = 3 }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><T label="PT" value={pt || ''} onChange={(e) => setPt(e.target.value)} rows={rows} /><T label="EN" value={en || ''} onChange={(e) => setEn(e.target.value)} rows={rows} /></div></div>;
}

function Upload({ label, value, onChange, helper = 'PNG/JPG recomendado.' }) {
  const [busy, setBusy] = useState(false);
  const onFile = async (e) => { const f = e.target.files?.[0]; if (!f) return; setBusy(true); try { onChange(await toDataUrl(f)); } finally { setBusy(false); e.target.value = ''; } };
  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-3">
        <Input type="file" accept="image/*" className={`${input} h-auto py-2`} onChange={onFile} />
        <div className="flex gap-2 items-center"><Button type="button" className={btnOutline} onClick={() => onChange('')} disabled={!value}>Remover</Button><span className="text-xs text-zinc-400">{busy ? 'Carregando...' : helper}</span></div>
        {value ? <div className="rounded-lg border border-white/10 bg-[#111418] p-2"><img src={value} alt={label} className="max-h-32 object-contain" /></div> : null}
      </div>
    </div>
  );
}

function TopicManager({ topics = [], onChange }) {
  const [newTopic, setNewTopic] = useState('');
  const add = () => {
    const value = String(newTopic || '').trim();
    if (!value) return;
    onChange([...(topics || []), { id: id(), title: value }]);
    setNewTopic('');
  };
  const remove = (topicId) => onChange((topics || []).filter((t) => t.id !== topicId));
  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">Topicos do Modulo *</Label>
      <div className="flex gap-2">
        <Input className={input} value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Digite um topico" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
        <Button type="button" className={btnPrimary} onClick={add}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {(topics || []).map((t) => (
          <div key={t.id} className="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 flex items-center justify-between">
            <span className="text-sm text-zinc-100">{t.title}</span>
            <Button type="button" className="bg-red-600 text-white hover:bg-red-500 h-8 px-2" onClick={() => remove(t.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrudList({ title, desc, icon, data, onNew, onEdit, onDelete, subtitle }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><H title={title} desc={desc} icon={icon} /><Button className={btnPrimary} onClick={onNew}><Plus className="w-4 h-4 mr-2" />Novo</Button></div>
      <div className="grid gap-3">
        {(data || []).map((x) => <div key={x.id} className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex items-center justify-between"><div><p className="font-medium">{x.name_pt || x.title_pt || x.question_pt || x.student_name || x.name || 'Item'}</p><p className="text-xs text-zinc-400">{subtitle?.(x) || ''}</p></div><div className="flex gap-2"><Button className={btnOutline} onClick={() => onEdit(x)}>Editar</Button><Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)}><Trash2 className="w-4 h-4" /></Button></div></div>)}
      </div>
    </div>
  );
}

export default function Admin() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('settings');
  const q = {
    settings: useQuery({ queryKey: ['settings'], queryFn: () => apiClient.get('settings') }),
    products: useQuery({ queryKey: ['products'], queryFn: () => apiClient.get('products'), initialData: [] }),
    course: useQuery({ queryKey: ['courseContent'], queryFn: () => apiClient.get('courseContent') }),
    modules: useQuery({ queryKey: ['modules'], queryFn: () => apiClient.get('modules'), initialData: [] }),
    students: useQuery({ queryKey: ['students'], queryFn: () => apiClient.get('students'), initialData: [] }),
    logos: useQuery({ queryKey: ['logos'], queryFn: () => apiClient.get('logos'), initialData: [] }),
    testimonials: useQuery({ queryKey: ['testimonials'], queryFn: () => apiClient.get('testimonials'), initialData: [] }),
    faqs: useQuery({ queryKey: ['faqs'], queryFn: () => apiClient.get('faqs'), initialData: [] }),
    beforeAfter: useQuery({ queryKey: ['beforeAfter'], queryFn: () => apiClient.get('beforeAfter'), initialData: [] }),
  };
  const menu = useMemo(() => [
    ['settings', 'Configuracoes', Settings],
    ['products', 'Produtos', Package],
    ['course', 'Conteudo Curso', BookOpen],
    ['modules', 'Modulos', BookOpen],
    ['students', 'Alunos', Users],
    ['logos', 'Logos', Image],
    ['testimonials', 'Depoimentos', MessageSquare],
    ['faqs', 'FAQ', HelpCircle],
    ['beforeAfter', 'Antes/Depois', LayoutDashboard],
  ], []);

  return (
    <div className="h-screen overflow-hidden bg-[#050608] text-zinc-100 flex">
      <aside className="w-72 hidden lg:flex flex-col border-r border-white/10 bg-[#0a0d13] h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b border-white/10"><img src="/logo-header.png" alt="logo" className="h-8 w-auto mb-2" /><p className="text-xs text-zinc-400 uppercase tracking-[0.2em]">Painel Administrativo</p></div>
        <nav className="p-3 space-y-2 flex-1">{menu.map(([k, n, I]) => <button key={k} onClick={() => setTab(k)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${tab === k ? 'bg-white text-black font-semibold' : 'text-zinc-200 hover:bg-white/10'}`}><I className="w-4 h-4" />{n}</button>)}</nav>
        <div className="p-4 border-t border-white/10"><Button className={`${btnOutline} w-full justify-start`} onClick={() => logout('/adm')}><LogOut className="w-4 h-4 mr-2" />Sair</Button></div>
      </aside>
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="h-16 border-b border-white/10 bg-[#050608]/90 backdrop-blur sticky top-0 z-20 px-6 flex items-center text-zinc-300">Admin</header>
        <div className="lg:hidden px-4 pt-4">
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-3">
            <Label className="text-zinc-300">Secao</Label>
            <select
              className="mt-2 w-full rounded-md border border-white/15 bg-zinc-900 px-3 py-2 text-zinc-100"
              value={tab}
              onChange={(e) => setTab(e.target.value)}
            >
              {menu.map(([k, n]) => (
                <option key={k} value={k}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {tab === 'settings' && <SettingsTab data={q.settings.data?.[0]} />}
          {tab === 'products' && <ProductsTab data={q.products.data} />}
          {tab === 'course' && <CourseTab data={q.course.data?.[0]} />}
          {tab === 'modules' && <ModulesTab data={q.modules.data} />}
          {tab === 'students' && <StudentsTab data={q.students.data} />}
          {tab === 'logos' && <LogosTab data={q.logos.data} />}
          {tab === 'testimonials' && <TestimonialsTab data={q.testimonials.data} />}
          {tab === 'faqs' && <FaqTab data={q.faqs.data} />}
          {tab === 'beforeAfter' && <BeforeAfterTab data={q.beforeAfter.data} />}
        </div>
      </main>
    </div>
  );
}

function SettingsTab({ data }) {
  return (
    <Card className={panel}>
      <CardHeader>
        <H title="Configuracoes do Site" desc="Nome e logo foram travados por padrao do projeto." icon={Settings} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 text-sm text-zinc-300">
          <p>Nome do site e logo estao bloqueados para edicao.</p>
          <p className="mt-2 text-zinc-400">Todo o restante do conteudo continua cadastravel nas demais secoes do painel.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductsTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({});
  const m = useMutation({ mutationFn: (x) => apiClient.save('products', x), onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }) });
  const edit = (x) => { setOpen(true); setF({ ...x, features_pt_text: toLines(x.features_pt || x.course_highlights_pt), features_en_text: toLines(x.features_en || x.course_highlights_en) }); };
  const save = () => {
    const showPt = f.show_in_pt !== false;
    const showEn = f.show_in_en !== false;
    if (!f.slug) return;
    if (!showPt && !showEn) return;
    if (showPt && !String(f.name_pt || '').trim()) return;
    if (showEn && !String(f.name_en || '').trim()) return;
    const item = { ...f, id: f.id || id(), price_brl: num(f.price_brl), price_usd: num(f.price_usd), compare_at_price_brl: num(f.compare_at_price_brl), compare_at_price_usd: num(f.compare_at_price_usd), features_pt: fromLines(f.features_pt_text), features_en: fromLines(f.features_en_text), detail_image_url: f.image_url || f.detail_image_url || '' };
    delete item.features_pt_text; delete item.features_en_text;
    const next = f.id ? data.map((p) => p.id === f.id ? item : p) : [...(data || []), item];
    m.mutate(next); setOpen(false); setF({});
  };
  const del = (xid) => m.mutate((data || []).filter((x) => x.id !== xid));
  return (
    <div className="space-y-6">
      <CrudList title="Produtos" desc="Cadastro completo de produtos." icon={Package} data={data} onNew={() => { setOpen(true); setF({ product_type: 'course', show_in_pt: true, show_in_en: true }); }} onEdit={edit} onDelete={del} subtitle={(x) => `R$ ${num(x.price_brl)} - $${num(x.price_usd)}`} />
      {open ? <Card className={panel}><CardContent className="p-6 space-y-4"><BI label="Nome *" pt={f.name_pt} en={f.name_en} setPt={(v) => setF({ ...f, name_pt: v })} setEn={(v) => setF({ ...f, name_en: v })} /><BT label="Descricao" pt={f.description_pt} en={f.description_en} setPt={(v) => setF({ ...f, description_pt: v })} setEn={(v) => setF({ ...f, description_en: v })} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="Slug *" value={f.slug || ''} onChange={(e) => setF({ ...f, slug: e.target.value })} /><F label="Tipo (course/luts) *" value={f.product_type || ''} onChange={(e) => setF({ ...f, product_type: e.target.value })} /></div><div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3"><Label className="text-zinc-300 mb-2 block">Mostrar no site *</Label><div className="flex gap-6"><label className="flex items-center gap-2 text-zinc-200"><input type="checkbox" className="accent-white" checked={f.show_in_pt !== false} onChange={(e) => setF({ ...f, show_in_pt: e.target.checked })} />Português</label><label className="flex items-center gap-2 text-zinc-200"><input type="checkbox" className="accent-white" checked={f.show_in_en !== false} onChange={(e) => setF({ ...f, show_in_en: e.target.checked })} />English</label></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="Preco BRL" type="number" value={f.price_brl || ''} onChange={(e) => setF({ ...f, price_brl: e.target.value })} /><F label="Preco USD" type="number" value={f.price_usd || ''} onChange={(e) => setF({ ...f, price_usd: e.target.value })} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="Preco Antigo BRL" type="number" value={f.compare_at_price_brl || ''} onChange={(e) => setF({ ...f, compare_at_price_brl: e.target.value })} /><F label="Preco Antigo USD" type="number" value={f.compare_at_price_usd || ''} onChange={(e) => setF({ ...f, compare_at_price_usd: e.target.value })} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="Link Compra BRL *" value={f.buy_link_brl || ''} onChange={(e) => setF({ ...f, buy_link_brl: e.target.value })} /><F label="Link Compra USD *" value={f.buy_link_usd || ''} onChange={(e) => setF({ ...f, buy_link_usd: e.target.value })} /></div><BT label="Bullets (uma linha por item)" pt={f.features_pt_text} en={f.features_en_text} setPt={(v) => setF({ ...f, features_pt_text: v })} setEn={(v) => setF({ ...f, features_en_text: v })} rows={5} /><Upload label="Imagem do Card" value={f.image_url || ''} onChange={(v) => setF({ ...f, image_url: v, detail_image_url: v })} /><div className="flex justify-end gap-2"><Button className={btnOutline} onClick={() => setOpen(false)}>Cancelar</Button><Button className={btnPrimary} onClick={save}>Salvar</Button></div></CardContent></Card> : null}
    </div>
  );
}

function CourseTab({ data }) {
  const qc = useQueryClient();
  const [f, setF] = useState(data || {});
  useEffect(() => { if (data) setF(data); }, [data]);
  const m = useMutation({ mutationFn: (x) => apiClient.save('courseContent', [x]), onSuccess: () => qc.invalidateQueries({ queryKey: ['courseContent'] }) });
  return <Card className={panel}><CardHeader><H title="Conteudo do Curso" desc="Hero e instrutor." icon={BookOpen} /></CardHeader><CardContent className="space-y-4"><BI label="Titulo Hero *" pt={f.hero_title_pt} en={f.hero_title_en} setPt={(v) => setF({ ...f, hero_title_pt: v })} setEn={(v) => setF({ ...f, hero_title_en: v })} /><BT label="Subtitulo Hero" pt={f.hero_subtitle_pt} en={f.hero_subtitle_en} setPt={(v) => setF({ ...f, hero_subtitle_pt: v })} setEn={(v) => setF({ ...f, hero_subtitle_en: v })} rows={3} /><F label="Nome do Instrutor *" value={f.instructor_name || ''} onChange={(e) => setF({ ...f, instructor_name: e.target.value })} /><BT label="Bio do Instrutor" pt={f.instructor_bio_pt} en={f.instructor_bio_en} setPt={(v) => setF({ ...f, instructor_bio_pt: v })} setEn={(v) => setF({ ...f, instructor_bio_en: v })} rows={5} /><Upload label="Imagem Hero" value={f.hero_image_url || ''} onChange={(v) => setF({ ...f, hero_image_url: v })} /><Upload label="Foto do Instrutor" value={f.instructor_photo_url || ''} onChange={(v) => setF({ ...f, instructor_photo_url: v })} /><Button className={`${btnPrimary} w-full`} onClick={() => m.mutate(f)}>Salvar</Button></CardContent></Card>;
}

function ModulesTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ title_pt: '', title_en: '', description_pt: '', description_en: '', lessons_count: 0, duration_hours: 0, topics: [] });
  const [dragId, setDragId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const m = useMutation({
    mutationFn: (x) => apiClient.save('modules', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['modules'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar modulos.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => normalizeModule(x, index))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => toModulePayload(x, index));
    await m.mutateAsync(payload);
  };

  const edit = (x) => { setOpen(true); setF(normalizeModule(x)); };
  const save = async () => {
    if (savingForm) return;
    const item = normalizeModule(f, items.length);
    const next = f.id ? items.map((x) => x.id === f.id ? item : x) : [...items, item];
    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setF({ title_pt: '', title_en: '', description_pt: '', description_en: '', lessons_count: 0, duration_hours: 0, topics: [] });
    } finally {
      setSavingForm(false);
    }
  };
  const del = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const onDropAt = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    await persist(next);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <H title="Modulos" desc="Titulo, descricao, licoes e topicos. Arraste para ordenar." icon={BookOpen} />
          <Button className={btnPrimary} onClick={() => { setOpen(true); setF({ title_pt: '', title_en: '', description_pt: '', description_en: '', lessons_count: 0, duration_hours: 0, topics: [] }); }}>
            <Plus className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
        <div className="grid gap-3">
          {items.map((x) => (
            <div
              key={x.id}
              draggable
              onDragStart={() => setDragId(x.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropAt(x.id)}
              className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <p className="font-medium truncate">{x.title_pt || x.title_en || 'Item'}</p>
                  <p className="text-xs text-zinc-400">{num(x.lessons_count)} licoes - {num(x.duration_hours)}h</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className={btnOutline} onClick={() => edit(x)}>Editar</Button>
                <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => del(x.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open ? <Card className={panel}><CardContent className="p-6 space-y-4"><BI label="Titulo *" pt={f.title_pt} en={f.title_en} setPt={(v) => setF({ ...f, title_pt: v })} setEn={(v) => setF({ ...f, title_en: v })} /><BT label="Descricao" pt={f.description_pt} en={f.description_en} setPt={(v) => setF({ ...f, description_pt: v })} setEn={(v) => setF({ ...f, description_en: v })} rows={3} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="Licoes *" type="number" min="0" value={f.lessons_count || 0} onChange={(e) => setF({ ...f, lessons_count: e.target.value })} /><F label="Duracao (h) *" type="number" min="0" value={f.duration_hours || 0} onChange={(e) => setF({ ...f, duration_hours: e.target.value })} /></div><TopicManager topics={f.topics || []} onChange={(topics) => setF({ ...f, topics })} /><div className="flex justify-end gap-2"><Button className={btnOutline} onClick={() => setOpen(false)}>Cancelar</Button><Button className={btnPrimary} disabled={savingForm} onClick={save}>{savingForm ? 'Salvando...' : 'Salvar'}</Button></div></CardContent></Card> : null}
    </div>
  );
}

function StudentsTab({ data }) { return <GenericSimple title="Alunos" icon={Users} desc="Depoimentos de alunos." keyName="students" data={data} template={{ name: '', role_pt: '', role_en: '', testimonial_pt: '', testimonial_en: '', rating: 5, image_url: '' }} mapOut={(x) => ({ ...x, rating: num(x.rating, 5) })} fields={(f, setF) => <><F label="Nome *" value={f.name || ''} onChange={(e) => setF({ ...f, name: e.target.value })} /><BI label="Cargo *" pt={f.role_pt} en={f.role_en} setPt={(v) => setF({ ...f, role_pt: v })} setEn={(v) => setF({ ...f, role_en: v })} /><BT label="Depoimento *" pt={f.testimonial_pt} en={f.testimonial_en} setPt={(v) => setF({ ...f, testimonial_pt: v })} setEn={(v) => setF({ ...f, testimonial_en: v })} rows={4} /><F label="Rating (1-5) *" type="number" min="1" max="5" value={f.rating || 5} onChange={(e) => setF({ ...f, rating: e.target.value })} /><Upload label="Foto do Aluno" value={f.image_url || ''} onChange={(v) => setF({ ...f, image_url: v })} /></>} subtitle={(x) => x.role_pt || ''} />; }

function LogosTab({ data }) { return <GenericSimple title="Logos" icon={Image} desc="Marcas e parceiros." keyName="logos" data={data} template={{ name: '', logo_url: '' }} fields={(f, setF) => <><F label="Nome da Marca *" value={f.name || ''} onChange={(e) => setF({ ...f, name: e.target.value })} /><Upload label="Logo *" value={f.logo_url || ''} onChange={(v) => setF({ ...f, logo_url: v })} /></>} subtitle={() => ''} />; }

function TestimonialsTab({ data }) { return <GenericSimple title="Depoimentos" icon={MessageSquare} desc="Social proof da landing." keyName="testimonials" data={data} template={{ student_name: '', role_pt: '', role_en: '', testimonial_pt: '', testimonial_en: '', avatar_url: '' }} fields={(f, setF) => <><F label="Nome do Aluno *" value={f.student_name || ''} onChange={(e) => setF({ ...f, student_name: e.target.value })} /><BI label="Cargo *" pt={f.role_pt} en={f.role_en} setPt={(v) => setF({ ...f, role_pt: v })} setEn={(v) => setF({ ...f, role_en: v })} /><BT label="Depoimento *" pt={f.testimonial_pt} en={f.testimonial_en} setPt={(v) => setF({ ...f, testimonial_pt: v })} setEn={(v) => setF({ ...f, testimonial_en: v })} rows={4} /><Upload label="Avatar" value={f.avatar_url || ''} onChange={(v) => setF({ ...f, avatar_url: v })} /></>} subtitle={(x) => x.role_pt || ''} />; }

function FaqTab({ data }) { return <GenericSimple title="FAQ" icon={HelpCircle} desc="Perguntas frequentes." keyName="faqs" data={data} template={{ question_pt: '', question_en: '', answer_pt: '', answer_en: '' }} fields={(f, setF) => <><BI label="Pergunta *" pt={f.question_pt} en={f.question_en} setPt={(v) => setF({ ...f, question_pt: v })} setEn={(v) => setF({ ...f, question_en: v })} /><BT label="Resposta *" pt={f.answer_pt} en={f.answer_en} setPt={(v) => setF({ ...f, answer_pt: v })} setEn={(v) => setF({ ...f, answer_en: v })} rows={5} /></>} subtitle={(x) => x.question_en || ''} />; }

function BeforeAfterTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    title_pt: '',
    title_en: '',
    description_pt: '',
    description_en: '',
    before_url: '',
    during_url: '',
    after_url: '',
  });
  const [dragId, setDragId] = useState('');
  const seededRef = React.useRef(false);

  const m = useMutation({
    mutationFn: (x) => apiClient.save('beforeAfter', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['beforeAfter'] }),
    onError: (err) => {
      const message = err?.message || 'Falha ao salvar Antes/Depois.';
      window.alert(message);
    },
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => normalizeBeforeAfter(x, index))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  useEffect(() => {
    if (seededRef.current) return;
    if (m.isPending) return;
    if (!Array.isArray(data)) return;
    if (data.length > 0) return;
    seededRef.current = true;
    m.mutate(DEFAULT_BEFORE_AFTER.map((x) => toBeforeAfterPayload(x)));
  }, [data, m.isPending]);

  const persist = (nextItems, opts = {}) => {
    const withOrder = nextItems.map((x, index) => toBeforeAfterPayload({ ...x, order: index }));
    m.mutate(withOrder, opts);
  };

  const onNew = () => {
    setF({
      title_pt: '',
      title_en: '',
      description_pt: '',
      description_en: '',
      before_url: '',
      during_url: '',
      after_url: '',
    });
    setOpen(true);
  };

  const onEdit = (x) => {
    const item = normalizeBeforeAfter(x);
    setF(item);
    setOpen(true);
  };

  const onDelete = (xid) => {
    persist(items.filter((x) => x.id !== xid));
  };

  const onSave = () => {
    const item = normalizeBeforeAfter(f, items.length);
    const next = f.id ? items.map((x) => (x.id === f.id ? item : x)) : [...items, item];
    persist(next, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const onDropAt = (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    persist(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <H
          title="Antes / Depois"
          desc="Arraste e solte para escolher a ordem. 3 fotos por cadastro: antes, durante e depois."
          icon={LayoutDashboard}
        />
        <Button className={btnPrimary} onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      <div className="grid gap-3">
        {items.map((x) => (
          <div
            key={x.id}
            draggable
            onDragStart={() => setDragId(x.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDropAt(x.id)}
            className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <p className="font-medium truncate">{x.title_pt || x.title_en || 'Item'}</p>
                <p className="text-xs text-zinc-400">Posicao {num(x.order, 0) + 1}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className={btnOutline} onClick={() => onEdit(x)}>
                Editar
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)} disabled={m.isPending}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {open ? (
        <Card className={panel}>
          <CardContent className="p-6 space-y-4">
            <BI
              label="Titulo *"
              pt={f.title_pt}
              en={f.title_en}
              setPt={(v) => setF({ ...f, title_pt: v })}
              setEn={(v) => setF({ ...f, title_en: v })}
            />
            <BT
              label="Descricao"
              pt={f.description_pt}
              en={f.description_en}
              setPt={(v) => setF({ ...f, description_pt: v })}
              setEn={(v) => setF({ ...f, description_en: v })}
              rows={3}
            />
            <Upload label="Imagem Antes *" value={f.before_url || ''} onChange={(v) => setF({ ...f, before_url: v })} />
            <Upload label="Imagem Durante *" value={f.during_url || ''} onChange={(v) => setF({ ...f, during_url: v })} />
            <Upload label="Imagem Depois *" value={f.after_url || ''} onChange={(v) => setF({ ...f, after_url: v })} />
            <div className="flex justify-end gap-2">
              <Button className={btnOutline} onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button className={btnPrimary} onClick={onSave} disabled={m.isPending}>
                {m.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function GenericSimple({ title, icon, desc, keyName, data, template, fields, subtitle, mapIn = (x) => x, mapOut = (x) => x }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(template);
  const m = useMutation({ mutationFn: (x) => apiClient.save(keyName, x), onSuccess: () => qc.invalidateQueries({ queryKey: [keyName] }) });
  const edit = (x) => { setOpen(true); setF(mapIn(x)); };
  const save = () => { const item = { ...mapOut(f), id: f.id || id() }; const next = f.id ? data.map((x) => x.id === f.id ? item : x) : [...(data || []), item]; m.mutate(next); setOpen(false); setF(template); };
  const del = (xid) => m.mutate((data || []).filter((x) => x.id !== xid));
  return <div className="space-y-6"><CrudList title={title} desc={desc} icon={icon} data={data} onNew={() => { setOpen(true); setF(template); }} onEdit={edit} onDelete={del} subtitle={subtitle} />{open ? <Card className={panel}><CardContent className="p-6 space-y-4">{fields(f, setF)}<div className="flex justify-end gap-2"><Button className={btnOutline} onClick={() => setOpen(false)}>Cancelar</Button><Button className={btnPrimary} onClick={save}>Salvar</Button></div></CardContent></Card> : null}</div>;
}

