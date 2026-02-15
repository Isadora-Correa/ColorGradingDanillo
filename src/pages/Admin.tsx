import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  Package, 
  BookOpen, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Image, 
  LogOut, 
  Save, 
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { toast } from 'sonner'; 
import { v4 as uuidv4 } from 'uuid';

// Type definitions
type FormData = Record<string, any>;

// Componentes Bilíngues
function BilingualInput({ label, valuePt, valueEn, onChangePt, onChangeEn, placeholder = "" }) {
  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-xs text-zinc-400">🇧🇷 Português</span>
          <Input 
            value={valuePt || ''} 
            onChange={e => onChangePt(e.target.value)}
            placeholder={`${placeholder} PT`}
            className="bg-zinc-800 border-white/10 text-white"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-zinc-400">🇺🇸 English</span>
          <Input 
            value={valueEn || ''} 
            onChange={e => onChangeEn(e.target.value)}
            placeholder={`${placeholder} EN`}
            className="bg-zinc-800 border-white/10 text-white"
          />
        </div>
      </div>
    </div>
  );
}

function BilingualTextarea({ label, valuePt, valueEn, onChangePt, onChangeEn, rows = 3 }) {
  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-xs text-zinc-400">🇧🇷 Português</span>
          <textarea 
            value={valuePt || ''} 
            onChange={e => onChangePt(e.target.value)}
            rows={rows}
            className="w-full bg-zinc-800 border border-white/10 text-white rounded-md p-2 resize-none"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-zinc-400">🇺🇸 English</span>
          <textarea 
            value={valueEn || ''} 
            onChange={e => onChangeEn(e.target.value)}
            rows={rows}
            className="w-full bg-zinc-800 border border-white/10 text-white rounded-md p-2 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// Timeline Interativa
function CourseTimeline({ currentStage, onChangeStage }) {
  const stages = [
    { id: 'before', label: 'Antes do Curso', color: 'from-red-500 to-orange-500' },
    { id: 'during', label: 'Durante o Curso', color: 'from-yellow-500 to-lime-500' },
    { id: 'after', label: 'Depois do Curso', color: 'from-green-500 to-cyan-500' },
  ];

  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div className="space-y-4">
      <Label className="text-white">📈 Etapa do Curso (clique ou arraste)</Label>
      <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between relative mb-8">
          {/* Fundo da timeline */}
          <div className="absolute left-6 right-6 top-6 h-1 bg-zinc-800 rounded-full -z-10" />
          <div 
            className="absolute left-6 top-6 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-300 -z-10"
            style={{ width: `calc(${((currentIndex + 1) / stages.length) * 100}% + 12px)` }}
          />

          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex flex-col items-center relative z-10">
              <button
                onClick={() => onChangeStage(stage.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer mb-3 ${
                  currentIndex === idx
                    ? `bg-gradient-to-br ${stage.color} text-white shadow-lg scale-110`
                    : 'bg-zinc-800 text-zinc-400 border border-white/10 hover:bg-zinc-700'
                }`}
              >
                {idx + 1}
              </button>
              <span className="text-xs text-white text-center font-semibold">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Seletor de Idiomas com Checkboxes
function LanguageSelector({ selectedLanguages = [], onChange }) {
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const toggleLanguage = (code) => {
    const updated = selectedLanguages.includes(code)
      ? selectedLanguages.filter(l => l !== code)
      : [...selectedLanguages, code];
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <Label className="text-white">🌐 Idiomas Disponíveis</Label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => toggleLanguage(lang.code)}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              selectedLanguages.includes(lang.code)
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                : 'bg-zinc-800 border-white/10 text-zinc-400 hover:border-white/20'
            }`}
          >
            <div className="text-xl mb-1">{lang.flag}</div>
            <div className="text-xs font-semibold">{lang.name}</div>
            {selectedLanguages.includes(lang.code) && (
              <Check className="w-4 h-4 mx-auto mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Gerenciador de Tópicos
function TopicManager({ topics = [], onChange }) {
  const [newTopic, setNewTopic] = useState('');

  const addTopic = () => {
    if (newTopic.trim()) {
      onChange([...(topics || []), { id: uuidv4(), title: newTopic }]);
      setNewTopic('');
    }
  };

  const removeTopic = (id) => {
    onChange(topics.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-3">
      <Label className="text-white">📚 Tópicos/Lições do Módulo</Label>
      <div className="flex gap-2 mb-3">
        <Input 
          value={newTopic}
          onChange={e => setNewTopic(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTopic()}
          placeholder="Ex: Espaços de Cor, Curvas, Matrizes..."
          className="bg-zinc-800 border-white/10 text-white"
        />
        <Button onClick={addTopic} size="sm" className="bg-purple-600 hover:bg-purple-500">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {topics && topics.length > 0 ? (
          topics.map(topic => (
            <div key={topic.id} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg border border-white/5 hover:border-white/10 transition">
              <span className="text-white text-sm">{topic.title}</span>
              <button
                onClick={() => removeTopic(topic.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm italic">Nenhum tópico adicionado. Clique no + para começar!</p>
        )}
      </div>
    </div>
  );
}

// Tab Principal
export default function Admin() {
  const [activeTab, setActiveTab] = useState('settings');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: () => apiClient.get('settings') });
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => apiClient.get('products'), initialData: [] });
  const { data: courseContent } = useQuery({ queryKey: ['courseContent'], queryFn: () => apiClient.get('courseContent') });
  const { data: modules } = useQuery({ queryKey: ['modules'], queryFn: () => apiClient.get('modules'), initialData: [] });
  const { data: students } = useQuery({ queryKey: ['students'], queryFn: () => apiClient.get('students'), initialData: [] });
  const { data: logos } = useQuery({ queryKey: ['logos'], queryFn: () => apiClient.get('logos'), initialData: [] });
  const { data: testimonials } = useQuery({ queryKey: ['testimonials'], queryFn: () => apiClient.get('testimonials'), initialData: [] });
  const { data: faqs } = useQuery({ queryKey: ['faqs'], queryFn: () => apiClient.get('faqs'), initialData: [] });
  const { data: beforeAfter } = useQuery({ queryKey: ['beforeAfter'], queryFn: () => apiClient.get('beforeAfter'), initialData: [] });

  const tabs = [
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'course', label: 'Conteúdo Curso', icon: BookOpen },
    { id: 'modules', label: 'Módulos', icon: BookOpen },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'logos', label: 'Logos', icon: Image },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'beforeafter', label: 'Antes/Depois', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-6 py-4 sticky top-0 z-50 bg-zinc-950/95 backdrop-blur">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nava Colorist Admin</h1>
            <p className="text-sm text-zinc-400">🌐 Bilíngue PT/EN • Cadastro Unificado</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider text-green-400 font-bold">✓ ONLINE</span>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-900 border border-white/10 flex-wrap h-auto p-2 gap-2">
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 gap-2">
                <tab.icon className="w-4 h-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="settings"><SettingsTab data={settings?.[0]} /></TabsContent>
          <TabsContent value="products"><ProductsTab data={products} /></TabsContent>
          <TabsContent value="course"><CourseContentTab data={courseContent?.[0]} /></TabsContent>
          <TabsContent value="modules"><ModulesTab data={modules} /></TabsContent>
          <TabsContent value="students"><StudentsTab data={students} /></TabsContent>
          <TabsContent value="logos"><LogosTab data={logos} /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsTab data={testimonials} /></TabsContent>
          <TabsContent value="faq"><FAQTab data={faqs} /></TabsContent>
          <TabsContent value="beforeafter"><BeforeAfterTab data={beforeAfter} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// SettingsTab
function SettingsTab({ data }: { data?: FormData }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormData>(data || {});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const saveMutation = useMutation({
    mutationFn: (updatedData) => apiClient.save('settings', [updatedData]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('✓ Configurações salvas!');
    }
  });

  return (
    <Card className="bg-zinc-900 border-white/10 text-white">
      <CardHeader>
        <CardTitle>⚙️ Configurações do Site</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Nome do Site</Label>
          <Input value={form.site_name || ''} onChange={e => setForm({...form, site_name: e.target.value})} className="bg-zinc-800 border-white/10 text-white" />
        </div>
        <div>
          <Label>URL do Logo</Label>
          <Input value={form.logo_url || ''} onChange={e => setForm({...form, logo_url: e.target.value})} className="bg-zinc-800 border-white/10 text-white" />
        </div>
        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending} className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500">
          <Save className="w-4 h-4 mr-2" /> Salvar
        </Button>
      </CardContent>
    </Card>
  );
}

// ProductsTab - Bilíngue
function ProductsTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedProducts) => apiClient.save('products', updatedProducts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Produto salvo!');
    }
  });

  const handleSave = () => {
    if (!form.name_pt || !form.name_en) {
      toast.error('❌ Nome em PT e EN são obrigatórios');
      return;
    }
    const updated = form.id ? data.map(p => p.id === form.id ? form : p) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Produto
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">📦 Editar Produto</h3>
          <BilingualInput 
            label="Nome do Produto"
            valuePt={form.name_pt}
            valueEn={form.name_en}
            onChangePt={v => setForm({...form, name_pt: v})}
            onChangeEn={v => setForm({...form, name_en: v})}
          />
          <BilingualTextarea 
            label="Descrição"
            valuePt={form.description_pt}
            valueEn={form.description_en}
            onChangePt={v => setForm({...form, description_pt: v})}
            onChangeEn={v => setForm({...form, description_en: v})}
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Preço (R$)</Label>
              <Input type="number" value={form.price_brl || ''} onChange={e => setForm({...form, price_brl: parseFloat(e.target.value)})} className="bg-zinc-800 border-white/10" />
            </div>
            <div>
              <Label>Preço (USD)</Label>
              <Input type="number" value={form.price_usd || ''} onChange={e => setForm({...form, price_usd: parseFloat(e.target.value)})} className="bg-zinc-800 border-white/10" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.map(product => (
          <Card key={product.id} className="bg-zinc-900 border-white/10 p-4 flex justify-between items-center hover:border-white/20 transition">
            <div>
              <p className="font-semibold text-white">{product.name_pt} / {product.name_en}</p>
              <p className="text-sm text-zinc-400">{product.price_brl ? `R$ ${product.price_brl.toLocaleString('pt-BR')}` : ''} • {product.price_usd ? `$${product.price_usd}` : ''}</p>
            </div>
            <Button variant="ghost" onClick={() => { setEditingId(product.id); setForm(product); }}>Editar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// CourseContentTab - Com Timeline, Idiomas e Bilíngue
function CourseContentTab({ data }: { data?: FormData }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormData>(data || {});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const saveMutation = useMutation({
    mutationFn: (updatedData) => apiClient.save('courseContent', [updatedData]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseContent'] });
      toast.success('✓ Conteúdo do curso salvo!');
    }
  });

  return (
    <Card className="bg-zinc-900 border-white/10 text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">📚 Conteúdo do Curso</h2>
      
      <div className="space-y-6">
        {/* Timeline Interativa */}
        <CourseTimeline 
          currentStage={form.course_stage || 'before'}
          onChangeStage={(stage) => setForm({...form, course_stage: stage})}
        />

        {/* Seletor de Idiomas com Checkboxes */}
        <LanguageSelector 
          selectedLanguages={form.available_languages?.map(l => typeof l === 'string' ? l : l.code) || []}
          onChange={(codes) => {
            const languages = codes.map(code => {
              const langNames = { pt: 'Português', en: 'English', es: 'Español', fr: 'Français', ar: 'العربية' };
              return { code, name: langNames[code], available: true };
            });
            setForm({...form, available_languages: languages});
          }}
        />

        {/* Títulos do Hero */}
        <BilingualInput 
          label="Título da Hero"
          valuePt={form.hero_title_pt}
          valueEn={form.hero_title_en}
          onChangePt={v => setForm({...form, hero_title_pt: v})}
          onChangeEn={v => setForm({...form, hero_title_en: v})}
        />

        <BilingualTextarea 
          label="Subtítulo da Hero"
          valuePt={form.hero_subtitle_pt}
          valueEn={form.hero_subtitle_en}
          onChangePt={v => setForm({...form, hero_subtitle_pt: v})}
          onChangeEn={v => setForm({...form, hero_subtitle_en: v})}
          rows={2}
        />

        {/* Info do Instrutor */}
        <div>
          <Label className="text-white">Nome do Instrutor</Label>
          <Input value={form.instructor_name || ''} onChange={e => setForm({...form, instructor_name: e.target.value})} className="bg-zinc-800 border-white/10" />
        </div>

        <BilingualTextarea 
          label="Bio do Instrutor"
          valuePt={form.instructor_bio_pt}
          valueEn={form.instructor_bio_en}
          onChangePt={v => setForm({...form, instructor_bio_pt: v})}
          onChangeEn={v => setForm({...form, instructor_bio_en: v})}
          rows={3}
        />

        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending} className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 w-full">
          <Save className="w-4 h-4 mr-2" /> Salvar Conteúdo do Curso
        </Button>
      </div>
    </Card>
  );
}

// ModulesTab - Com Tópicos/Lições
function ModulesTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedModules) => apiClient.save('modules', updatedModules),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Módulo salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(m => m.id === form.id ? form : m) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Módulo
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">📖 Editar Módulo</h3>
          <BilingualInput 
            label="Título do Módulo"
            valuePt={form.title_pt}
            valueEn={form.title_en}
            onChangePt={v => setForm({...form, title_pt: v})}
            onChangeEn={v => setForm({...form, title_en: v})}
          />
          <BilingualTextarea 
            label="Descrição"
            valuePt={form.description_pt}
            valueEn={form.description_en}
            onChangePt={v => setForm({...form, description_pt: v})}
            onChangeEn={v => setForm({...form, description_en: v})}
            rows={2}
          />
          
          {/* Gerenciador de Tópicos */}
          <TopicManager 
            topics={form.topics}
            onChange={(topics) => setForm({...form, topics})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Número de Lições</Label>
              <Input type="number" value={form.lessons_count || ''} onChange={e => setForm({...form, lessons_count: parseInt(e.target.value)})} className="bg-zinc-800 border-white/10" />
            </div>
            <div>
              <Label>Duração (horas)</Label>
              <Input type="number" value={form.duration_hours || ''} onChange={e => setForm({...form, duration_hours: parseFloat(e.target.value)})} className="bg-zinc-800 border-white/10" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.map(module => (
          <Card key={module.id} className="bg-zinc-900 border-white/10 p-4 hover:border-white/20 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-white">{module.title_pt} / {module.title_en}</p>
                <p className="text-sm text-zinc-400">{module.lessons_count} lições • {module.duration_hours}h</p>
                {module.topics && module.topics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {module.topics.map(t => (
                      <span key={t.id} className="inline-block text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">{t.title}</span>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" onClick={() => { setEditingId(module.id); setForm(module); }}>Editar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// StudentsTab
function StudentsTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedStudents) => apiClient.save('students', updatedStudents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Aluno salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(s => s.id === form.id ? form : s) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Aluno
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">👤 Editar Aluno</h3>
          <div>
            <Label>Nome</Label>
            <Input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 border-white/10" />
          </div>
          <BilingualInput 
            label="Cargo/Profissão"
            valuePt={form.role_pt}
            valueEn={form.role_en}
            onChangePt={v => setForm({...form, role_pt: v})}
            onChangeEn={v => setForm({...form, role_en: v})}
          />
          <BilingualTextarea 
            label="Depoimento"
            valuePt={form.testimonial_pt}
            valueEn={form.testimonial_en}
            onChangePt={v => setForm({...form, testimonial_pt: v})}
            onChangeEn={v => setForm({...form, testimonial_en: v})}
            rows={3}
          />
          <div>
            <Label>Rating (1-5)</Label>
            <Input type="number" min="1" max="5" value={form.rating || 5} onChange={e => setForm({...form, rating: parseInt(e.target.value)})} className="bg-zinc-800 border-white/10" />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.map(student => (
          <Card key={student.id} className="bg-zinc-900 border-white/10 p-4 flex justify-between items-center hover:border-white/20 transition">
            <div>
              <p className="font-semibold text-white">{student.name}</p>
              <p className="text-sm text-zinc-400">{student.role_pt} / {student.role_en}</p>
            </div>
            <Button variant="ghost" onClick={() => { setEditingId(student.id); setForm(student); }}>Editar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// LogosTab
function LogosTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedLogos) => apiClient.save('logos', updatedLogos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logos'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Logo salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(l => l.id === form.id ? form : l) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Logo
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">🏢 Editar Logo</h3>
          <div>
            <Label>Nome da Marca</Label>
            <Input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 border-white/10" />
          </div>
          <div>
            <Label>URL do Logo</Label>
            <Input value={form.logo_url || ''} onChange={e => setForm({...form, logo_url: e.target.value})} className="bg-zinc-800 border-white/10" placeholder="http://..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map(logo => (
          <Card key={logo.id} className="bg-zinc-900 border-white/10 p-4 hover:border-white/20 transition cursor-pointer relative group" onClick={() => { setEditingId(logo.id); setForm(logo); }}>
            {logo.logo_url && (
              <img src={logo.logo_url} alt={logo.name} className="w-full h-24 object-contain mb-2" />
            )}
            <p className="text-sm font-semibold text-white text-center truncate">{logo.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// TestimonialsTab
function TestimonialsTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedTestimonials) => apiClient.save('testimonials', updatedTestimonials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Depoimento salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(t => t.id === form.id ? form : t) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Depoimento
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">💬 Editar Depoimento</h3>
          <div>
            <Label>Nome do Aluno</Label>
            <Input value={form.student_name || ''} onChange={e => setForm({...form, student_name: e.target.value})} className="bg-zinc-800 border-white/10" />
          </div>
          <BilingualInput 
            label="Cargo/Profissão"
            valuePt={form.role_pt}
            valueEn={form.role_en}
            onChangePt={v => setForm({...form, role_pt: v})}
            onChangeEn={v => setForm({...form, role_en: v})}
          />
          <BilingualTextarea 
            label="Depoimento"
            valuePt={form.testimonial_pt}
            valueEn={form.testimonial_en}
            onChangePt={v => setForm({...form, testimonial_pt: v})}
            onChangeEn={v => setForm({...form, testimonial_en: v})}
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.map(testimonial => (
          <Card key={testimonial.id} className="bg-zinc-900 border-white/10 p-4 hover:border-white/20 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-white">{testimonial.student_name}</p>
                <p className="text-sm text-zinc-400">{testimonial.role_pt}</p>
                <p className="text-sm text-zinc-300 mt-2 italic">"{testimonial.testimonial_pt?.substring(0, 100)}..."</p>
              </div>
              <Button variant="ghost" onClick={() => { setEditingId(testimonial.id); setForm(testimonial); }}>Editar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// FAQTab
function FAQTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedFAQs) => apiClient.save('faqs', updatedFAQs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ FAQ salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(f => f.id === form.id ? form : f) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Nova Pergunta
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">❓ Editar FAQ</h3>
          <BilingualInput 
            label="Pergunta"
            valuePt={form.question_pt}
            valueEn={form.question_en}
            onChangePt={v => setForm({...form, question_pt: v})}
            onChangeEn={v => setForm({...form, question_en: v})}
          />
          <BilingualTextarea 
            label="Resposta"
            valuePt={form.answer_pt}
            valueEn={form.answer_en}
            onChangePt={v => setForm({...form, answer_pt: v})}
            onChangeEn={v => setForm({...form, answer_en: v})}
            rows={4}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.map(faq => (
          <Card key={faq.id} className="bg-zinc-900 border-white/10 p-4 hover:border-white/20 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-white">{faq.question_pt}</p>
                <p className="text-sm text-zinc-400 mt-1">{faq.question_en}</p>
              </div>
              <Button variant="ghost" onClick={() => { setEditingId(faq.id); setForm(faq); }}>Editar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// BeforeAfterTab
function BeforeAfterTab({ data }: { data?: FormData[] }) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const mutation = useMutation({
    mutationFn: (updatedItems) => apiClient.save('beforeAfter', updatedItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beforeAfter'] });
      setEditingId(null);
      setForm({});
      toast.success('✓ Item salvo!');
    }
  });

  const handleSave = () => {
    const updated = form.id ? data.map(b => b.id === form.id ? form : b) : [...(data || []), { ...form, id: uuidv4() }];
    mutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => { setEditingId('new'); setForm({}); }} className="bg-gradient-to-r from-purple-600 to-pink-600">
        <Plus className="w-4 h-4 mr-2" /> Novo Antes/Depois
      </Button>

      {editingId && (
        <Card className="bg-zinc-900 border border-purple-500/50 text-white p-6 space-y-4">
          <h3 className="font-bold text-lg">📸 Editar Antes/Depois</h3>
          <div>
            <Label>URL Imagem Antes</Label>
            <Input value={form.before_url || ''} onChange={e => setForm({...form, before_url: e.target.value})} className="bg-zinc-800 border-white/10" placeholder="http://..." />
          </div>
          <div>
            <Label>URL Imagem Depois</Label>
            <Input value={form.after_url || ''} onChange={e => setForm({...form, after_url: e.target.value})} className="bg-zinc-800 border-white/10" placeholder="http://..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending} className="bg-green-600 hover:bg-green-500">Salvar</Button>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map(item => (
          <Card key={item.id} className="bg-zinc-900 border-white/10 p-4 hover:border-white/20 transition cursor-pointer" onClick={() => { setEditingId(item.id); setForm(item); }}>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {item.before_url && <img src={item.before_url} alt="Antes" className="w-full h-32 object-cover rounded" />}
              {item.after_url && <img src={item.after_url} alt="Depois" className="w-full h-32 object-cover rounded" />}
            </div>
            <Button variant="ghost" size="sm" className="w-full">Editar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
