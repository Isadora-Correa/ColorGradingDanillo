import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Settings, Package, BookOpen, Users, MessageSquare, HelpCircle,
  Image, Save, Plus, Trash2
} from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('settings');

  // Fetch all data
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => localClient.entities.SiteSettings.list(),
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => localClient.entities.Product.list(),
    initialData: [],
  });

  const { data: courseContent } = useQuery({
    queryKey: ['courseContent'],
    queryFn: () => localClient.entities.CourseContent.list(),
  });

  const { data: modules } = useQuery({
    queryKey: ['modules'],
    queryFn: () => localClient.entities.CourseModule.list(),
    initialData: [],
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => localClient.entities.Student.list(),
    initialData: [],
  });

  const { data: logos } = useQuery({
    queryKey: ['logos'],
    queryFn: () => localClient.entities.ClientLogo.list(),
    initialData: [],
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => localClient.entities.Testimonial.list(),
    initialData: [],
  });

  const { data: faqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => localClient.entities.FAQ.list(),
    initialData: [],
  });

  const { data: beforeAfter } = useQuery({
    queryKey: ['beforeAfter'],
    queryFn: () => localClient.entities.BeforeAfter.list(),
    initialData: [],
  });


  const tabs = [
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'course', label: 'Conteúdo Curso', icon: BookOpen },
    { id: 'modules', label: 'Módulos', icon: BookOpen },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'logos', label: 'Logos Clientes', icon: Image },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'beforeafter', label: 'Antes/Depois', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Nava Colorist - Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider text-zinc-500">modo local</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-900 border border-white/10 flex-wrap h-auto p-2 gap-2">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="data-[state=active]:bg-purple-600 gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="settings">
            <SettingsTab data={settings?.[0]} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab data={products} />
          </TabsContent>

          <TabsContent value="course">
            <CourseContentTab data={courseContent?.[0]} />
          </TabsContent>

          <TabsContent value="modules">
            <ModulesTab data={modules} />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab data={students} />
          </TabsContent>

          <TabsContent value="logos">
            <LogosTab data={logos} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsTab data={testimonials} />
          </TabsContent>

          <TabsContent value="faq">
            <FAQTab data={faqs} />
          </TabsContent>

          <TabsContent value="beforeafter">
            <BeforeAfterTab data={beforeAfter} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ data }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(data || {});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (formData) => {
      if (data?.id) {
        return localClient.entities.SiteSettings.update(data.id, formData);
      }
      return localClient.entities.SiteSettings.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      toast.success('Configurações salvas!');
    },
  });

  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader>
        <CardTitle>Configurações do Site</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Nome do Site</Label>
          <Input 
            value={form.site_name || ''} 
            onChange={e => setForm({...form, site_name: e.target.value})}
            className="bg-zinc-800 border-white/10"
          />
        </div>
        <div>
          <Label>URL do Logo</Label>
          <Input 
            value={form.logo_url || ''} 
            onChange={e => setForm({...form, logo_url: e.target.value})}
            className="bg-zinc-800 border-white/10"
          />
        </div>
        <div>
          <Label>URL do Vídeo Hero</Label>
          <Input 
            value={form.hero_video_url || ''} 
            onChange={e => setForm({...form, hero_video_url: e.target.value})}
            className="bg-zinc-800 border-white/10"
          />
        </div>
        <div>
          <Label>URL da Imagem Hero (alternativa)</Label>
          <Input 
            value={form.hero_image_url || ''} 
            onChange={e => setForm({...form, hero_image_url: e.target.value})}
            className="bg-zinc-800 border-white/10"
          />
        </div>
        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Products Tab
function ProductsTab({ data }) {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({});

  const saveMutation = useMutation({
    mutationFn: async (formData) => {
      if (formData.id) {
        return localClient.entities.Product.update(formData.id, formData);
      }
      return localClient.entities.Product.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setEditingProduct(null);
      setForm({});
      toast.success('Produto salvo!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => localClient.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Produto deletado!');
    },
  });

  const startEdit = (product) => {
    setEditingProduct(product?.id || 'new');
    setForm(product || {});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Produtos</h2>
        <Button onClick={() => startEdit(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {editingProduct && (
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome (PT)</Label>
                <Input 
                  value={form.name_pt || ''} 
                  onChange={e => setForm({...form, name_pt: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Nome (EN)</Label>
                <Input 
                  value={form.name_en || ''} 
                  onChange={e => setForm({...form, name_en: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Slug (identificador)</Label>
                <Input 
                  value={form.slug || ''} 
                  onChange={e => setForm({...form, slug: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                  placeholder="course, luts"
                />
              </div>
              <div>
                <Label>Tipo</Label>
                <select 
                  value={form.product_type || 'course'}
                  onChange={e => setForm({...form, product_type: e.target.value})}
                  className="w-full p-2 bg-zinc-800 border border-white/10 rounded-md"
                >
                  <option value="course">Curso</option>
                  <option value="luts">LUTs</option>
                </select>
              </div>
              <div>
                <Label>Preço BRL (R$)</Label>
                <Input 
                  type="number"
                  value={form.price_brl || ''} 
                  onChange={e => setForm({...form, price_brl: parseFloat(e.target.value)})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Preço USD ($)</Label>
                <Input 
                  type="number"
                  value={form.price_usd || ''} 
                  onChange={e => setForm({...form, price_usd: parseFloat(e.target.value)})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div className="col-span-2">
                <Label>URL da Imagem</Label>
                <Input 
                  value={form.image_url || ''} 
                  onChange={e => setForm({...form, image_url: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Link de Compra BRL</Label>
                <Input 
                  value={form.buy_link_brl || ''} 
                  onChange={e => setForm({...form, buy_link_brl: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Link de Compra USD</Label>
                <Input 
                  value={form.buy_link_usd || ''} 
                  onChange={e => setForm({...form, buy_link_usd: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Link Externo PT (redireciona)</Label>
                <Input 
                  value={form.external_link_pt || ''} 
                  onChange={e => setForm({...form, external_link_pt: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Link Externo EN (redireciona)</Label>
                <Input 
                  value={form.external_link_en || ''} 
                  onChange={e => setForm({...form, external_link_en: e.target.value})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div>
                <Label>Ordem</Label>
                <Input 
                  type="number"
                  value={form.order || ''} 
                  onChange={e => setForm({...form, order: parseInt(e.target.value)})}
                  className="bg-zinc-800 border-white/10"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={form.available !== false}
                    onCheckedChange={val => setForm({...form, available: val})}
                  />
                  <Label>Disponível</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={form.show_in_pt !== false}
                    onCheckedChange={val => setForm({...form, show_in_pt: val})}
                  />
                  <Label>Mostrar PT</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={form.show_in_en !== false}
                    onCheckedChange={val => setForm({...form, show_in_en: val})}
                  />
                  <Label>Mostrar EN</Label>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setEditingProduct(null)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {data?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(product => (
          <Card key={product.id} className="bg-zinc-900 border-white/10">
            <CardContent className="pt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {product.image_url && (
                  <img src={product.image_url} alt="" className="w-16 h-16 rounded object-cover" />
                )}
                <div>
                  <h3 className="font-medium">{product.name_pt}</h3>
                  <p className="text-sm text-zinc-400">
                    R$ {product.price_brl?.toLocaleString('pt-BR')} / $ {product.price_usd?.toLocaleString('en-US')}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {product.show_in_pt && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">PT</span>}
                    {product.show_in_en && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">EN</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => startEdit(product)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(product.id)}>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Course Content Tab
function CourseContentTab({ data }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(data || {});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (formData) => {
      if (data?.id) {
        return localClient.entities.CourseContent.update(data.id, formData);
      }
      return localClient.entities.CourseContent.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['courseContent']);
      toast.success('Conteúdo salvo!');
    },
  });

  const handleFeaturesChange = (lang, value) => {
    const features = value.split('\n').filter(f => f.trim());
    setForm({...form, [`hero_features_${lang}`]: features});
  };

  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader>
        <CardTitle>Conteúdo da Página do Curso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Título Hero (PT)</Label>
            <Input 
              value={form.hero_title_pt || ''} 
              onChange={e => setForm({...form, hero_title_pt: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>Título Hero (EN)</Label>
            <Input 
              value={form.hero_title_en || ''} 
              onChange={e => setForm({...form, hero_title_en: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>Subtítulo (PT)</Label>
            <Textarea 
              value={form.hero_subtitle_pt || ''} 
              onChange={e => setForm({...form, hero_subtitle_pt: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>Subtítulo (EN)</Label>
            <Textarea 
              value={form.hero_subtitle_en || ''} 
              onChange={e => setForm({...form, hero_subtitle_en: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>Features (PT) - uma por linha</Label>
            <Textarea 
              value={(form.hero_features_pt || []).join('\n')} 
              onChange={e => handleFeaturesChange('pt', e.target.value)}
              className="bg-zinc-800 border-white/10"
              rows={4}
            />
          </div>
          <div>
            <Label>Features (EN) - uma por linha</Label>
            <Textarea 
              value={(form.hero_features_en || []).join('\n')} 
              onChange={e => handleFeaturesChange('en', e.target.value)}
              className="bg-zinc-800 border-white/10"
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>URL Imagem Hero</Label>
            <Input 
              value={form.hero_image_url || ''} 
              onChange={e => setForm({...form, hero_image_url: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>URL Logo DaVinci</Label>
            <Input 
              value={form.davinci_logo_url || ''} 
              onChange={e => setForm({...form, davinci_logo_url: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
        </div>

        <h3 className="text-lg font-medium pt-4 border-t border-white/10">Instrutor</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Nome</Label>
            <Input 
              value={form.instructor_name || ''} 
              onChange={e => setForm({...form, instructor_name: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>URL Foto</Label>
            <Input 
              value={form.instructor_photo_url || ''} 
              onChange={e => setForm({...form, instructor_photo_url: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
          <div>
            <Label>Bio (PT)</Label>
            <Textarea 
              value={form.instructor_bio_pt || ''} 
              onChange={e => setForm({...form, instructor_bio_pt: e.target.value})}
              className="bg-zinc-800 border-white/10"
              rows={4}
            />
          </div>
          <div>
            <Label>Bio (EN)</Label>
            <Textarea 
              value={form.instructor_bio_en || ''} 
              onChange={e => setForm({...form, instructor_bio_en: e.target.value})}
              className="bg-zinc-800 border-white/10"
              rows={4}
            />
          </div>
          <div className="col-span-2">
            <Label>URL Showreel</Label>
            <Input 
              value={form.instructor_showreel_url || ''} 
              onChange={e => setForm({...form, instructor_showreel_url: e.target.value})}
              className="bg-zinc-800 border-white/10"
            />
          </div>
        </div>

        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Simplified Tabs for other entities
function ModulesTab({ data }) {
  return <EntityListTab 
    title="Módulos do Curso" 
    data={data} 
    entity="CourseModule"
    queryKey="modules"
    fields={[
      { key: 'title_pt', label: 'Título (PT)' },
      { key: 'title_en', label: 'Título (EN)' },
      { key: 'description_pt', label: 'Descrição (PT)', type: 'textarea' },
      { key: 'description_en', label: 'Descrição (EN)', type: 'textarea' },
      { key: 'lessons_pt', label: 'Aulas (PT) - uma por linha', type: 'array' },
      { key: 'lessons_en', label: 'Aulas (EN) - uma por linha', type: 'array' },
      { key: 'order', label: 'Ordem', type: 'number' },
      { key: 'show_in_en', label: 'Mostrar em EN', type: 'switch' },
    ]}
  />;
}

function StudentsTab({ data }) {
  return <EntityListTab 
    title="Alunos em Destaque" 
    data={data} 
    entity="Student"
    queryKey="students"
    fields={[
      { key: 'name', label: 'Nome' },
      { key: 'instagram', label: 'Instagram' },
      { key: 'photo_url', label: 'URL Foto' },
      { key: 'showreel_url', label: 'URL Showreel' },
      { key: 'testimonial_pt', label: 'Depoimento (PT)', type: 'textarea' },
      { key: 'testimonial_en', label: 'Depoimento (EN)', type: 'textarea' },
      { key: 'clients', label: 'Clientes - um por linha', type: 'array' },
      { key: 'order', label: 'Ordem', type: 'number' },
    ]}
  />;
}

function LogosTab({ data }) {
  return <EntityListTab 
    title="Logos de Clientes" 
    data={data} 
    entity="ClientLogo"
    queryKey="logos"
    fields={[
      { key: 'name', label: 'Nome' },
      { key: 'logo_url', label: 'URL Logo' },
      { key: 'order', label: 'Ordem', type: 'number' },
    ]}
  />;
}

function TestimonialsTab({ data }) {
  return <EntityListTab 
    title="Depoimentos" 
    data={data} 
    entity="Testimonial"
    queryKey="testimonials"
    fields={[
      { key: 'author_name', label: 'Nome' },
      { key: 'author_photo_url', label: 'URL Foto' },
      { key: 'video_url', label: 'URL Vídeo' },
      { key: 'text_pt', label: 'Texto (PT)', type: 'textarea' },
      { key: 'text_en', label: 'Texto (EN)', type: 'textarea' },
      { key: 'order', label: 'Ordem', type: 'number' },
    ]}
  />;
}

function FAQTab({ data }) {
  return <EntityListTab 
    title="Perguntas Frequentes" 
    data={data} 
    entity="FAQ"
    queryKey="faqs"
    fields={[
      { key: 'question_pt', label: 'Pergunta (PT)' },
      { key: 'question_en', label: 'Pergunta (EN)' },
      { key: 'answer_pt', label: 'Resposta (PT)', type: 'textarea' },
      { key: 'answer_en', label: 'Resposta (EN)', type: 'textarea' },
      { key: 'order', label: 'Ordem', type: 'number' },
    ]}
  />;
}

function BeforeAfterTab({ data }) {
  return <EntityListTab 
    title="Antes e Depois" 
    data={data} 
    entity="BeforeAfter"
    queryKey="beforeAfter"
    fields={[
      { key: 'title_pt', label: 'Título (PT)' },
      { key: 'title_en', label: 'Título (EN)' },
      { key: 'before_image_url', label: 'URL Imagem Antes' },
      { key: 'during_image_url', label: 'URL Imagem Durante' },
      { key: 'after_image_url', label: 'URL Imagem Depois' },
      { key: 'order', label: 'Ordem', type: 'number' },
    ]}
  />;
}

// Generic Entity List Tab
function EntityListTab({ title, data, entity, fields, queryKey }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const listKey = queryKey || entity.toLowerCase();

  const saveMutation = useMutation({
    mutationFn: async (formData) => {
      if (formData.id) {
        return localClient.entities[entity].update(formData.id, formData);
      }
      return localClient.entities[entity].create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([listKey]);
      setEditing(null);
      setForm({});
      toast.success('Salvo!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => localClient.entities[entity].delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries([listKey]);
      toast.success('Deletado!');
    },
  });

  const startEdit = (item) => {
    setEditing(item?.id || 'new');
    setForm(item || {});
  };

  const renderField = (field) => {
    if (field.type === 'textarea') {
      return (
        <Textarea 
          value={form[field.key] || ''} 
          onChange={e => setForm({...form, [field.key]: e.target.value})}
          className="bg-zinc-800 border-white/10"
          rows={3}
        />
      );
    }
    if (field.type === 'number') {
      return (
        <Input 
          type="number"
          value={form[field.key] || ''} 
          onChange={e => setForm({...form, [field.key]: parseInt(e.target.value) || 0})}
          className="bg-zinc-800 border-white/10"
        />
      );
    }
    if (field.type === 'switch') {
      return (
        <Switch 
          checked={form[field.key] !== false}
          onCheckedChange={val => setForm({...form, [field.key]: val})}
        />
      );
    }
    if (field.type === 'array') {
      return (
        <Textarea 
          value={(form[field.key] || []).join('\n')} 
          onChange={e => setForm({...form, [field.key]: e.target.value.split('\n').filter(v => v.trim())})}
          className="bg-zinc-800 border-white/10"
          rows={4}
        />
      );
    }
    return (
      <Input 
        value={form[field.key] || ''} 
        onChange={e => setForm({...form, [field.key]: e.target.value})}
        className="bg-zinc-800 border-white/10"
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button onClick={() => startEdit(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      {editing && (
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.map(field => (
                <div key={field.key} className={field.type === 'textarea' || field.type === 'array' ? 'col-span-2' : ''}>
                  <Label>{field.label}</Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3">
        {data?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(item => (
          <Card key={item.id} className="bg-zinc-900 border-white/10">
            <CardContent className="pt-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {item[fields[0].key] || item.name || `Item ${item.id}`}
                </h3>
                {item.order !== undefined && (
                  <span className="text-xs text-zinc-500">Ordem: {item.order}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => startEdit(item)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(item.id)}>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

