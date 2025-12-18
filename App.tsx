
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Truck,
  ArrowRightLeft,
  Filter,
  Download,
  Settings,
  Bell,
  User
} from 'lucide-react';
import { Protocol, ProtocolStatus, ProtocolType } from './types';

// Mock Initial Data
const INITIAL_PROTOCOLS: Protocol[] = [
  {
    id: '1',
    code: 'PRT-2024-001',
    title: 'Contrato de Prestação de Serviços - TI',
    description: 'Contrato referente à manutenção mensal dos servidores da matriz.',
    sender: 'Tech Solutions Ltda',
    recipient: 'Departamento de TI',
    createdAt: new Date().toISOString(),
    status: ProtocolStatus.PENDING,
    type: ProtocolType.PHYSICAL,
    category: 'Contrato'
  },
  {
    id: '2',
    code: 'PRT-2024-002',
    title: 'Nota Fiscal - Compra de Equipamentos',
    description: 'NF-e 4590 referente à aquisição de 5 novos notebooks.',
    sender: 'Mega Store Informatica',
    recipient: 'Almoxarifado',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: ProtocolStatus.DELIVERED,
    type: ProtocolType.DIGITAL,
    category: 'Financeiro'
  }
];

export default function App() {
  const [protocols, setProtocols] = useState<Protocol[]>(INITIAL_PROTOCOLS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'new'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Protocol Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sender: '',
    recipient: '',
    type: ProtocolType.PHYSICAL,
    category: ''
  });

  const stats = useMemo(() => ({
    total: protocols.length,
    pending: protocols.filter(p => p.status === ProtocolStatus.PENDING).length,
    signed: protocols.filter(p => p.status === ProtocolStatus.SIGNED).length,
    delivered: protocols.filter(p => p.status === ProtocolStatus.DELIVERED).length,
  }), [protocols]);

  const filteredProtocols = protocols.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    const newProtocol: Protocol = {
      id: Math.random().toString(36).substr(2, 9),
      code: `PRT-2024-${(protocols.length + 1).toString().padStart(3, '0')}`,
      ...formData,
      createdAt: new Date().toISOString(),
      status: ProtocolStatus.PENDING,
    };
    setProtocols([newProtocol, ...protocols]);
    setFormData({ title: '', description: '', sender: '', recipient: '', type: ProtocolType.PHYSICAL, category: '' });
    setActiveTab('list');
  };

  const updateStatus = (id: string, newStatus: ProtocolStatus) => {
    setProtocols(protocols.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-indigo-800">
          <div className="bg-white p-2 rounded-lg">
            <ArrowRightLeft className="text-indigo-900 h-6 w-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">DocProtocol</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-800 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'list' ? 'bg-indigo-800 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            <FileText size={20} />
            <span className="font-medium">Protocolos</span>
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'new' ? 'bg-indigo-800 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            <PlusCircle size={20} />
            <span className="font-medium">Novo Protocolo</span>
          </button>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button className="w-full flex items-center gap-3 p-3 text-indigo-200 hover:text-white transition-colors">
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por código ou título..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700">Admin User</p>
                <p className="text-xs text-slate-500">Logística</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Visão Geral</h1>
                  <p className="text-slate-500">Bem-vindo ao sistema de controle de protocolos.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('new')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <PlusCircle size={20} /> Novo Registro
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FileText className="text-blue-600" />} label="Total" value={stats.total} color="bg-blue-50" />
                <StatCard icon={<Clock className="text-amber-600" />} label="Pendentes" value={stats.pending} color="bg-amber-50" />
                <StatCard icon={<CheckCircle2 className="text-emerald-600" />} label="Assinados" value={stats.signed} color="bg-emerald-50" />
                <StatCard icon={<Truck className="text-purple-600" />} label="Entregues" value={stats.delivered} color="bg-purple-50" />
              </div>

              {/* Recent Activity */}
              <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">Protocolos Recentes</h3>
                  <button onClick={() => setActiveTab('list')} className="text-indigo-600 text-sm font-medium hover:underline">Ver todos</button>
                </div>
                <div className="space-y-4">
                  {protocols.slice(0, 5).map((protocol) => (
                    <div key={protocol.id} className="flex items-center justify-between p-4 border border-slate-50 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${protocol.type === ProtocolType.DIGITAL ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{protocol.title}</p>
                          <p className="text-xs text-slate-500">{protocol.code} • {new Date(protocol.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <StatusBadge status={protocol.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Listagem de Protocolos</h1>
                  <p className="text-slate-500">Gerencie e filtre todos os registros do sistema.</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
                    <Filter size={18} /> Filtrar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
                    <Download size={18} /> Exportar CSV
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Protocolo</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documento / Categoria</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Origem / Destino</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProtocols.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 font-bold">{p.code}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800 text-sm line-clamp-1">{p.title}</p>
                          <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold uppercase">{p.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs space-y-1">
                            <p className="text-slate-500"><span className="font-medium text-slate-700">De:</span> {p.sender}</p>
                            <p className="text-slate-500"><span className="font-medium text-slate-700">Para:</span> {p.recipient}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">
                          {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {p.status === ProtocolStatus.PENDING && (
                              <button 
                                onClick={() => updateStatus(p.id, ProtocolStatus.SIGNED)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Marcar como Assinado"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => updateStatus(p.id, ProtocolStatus.CANCELLED)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Cancelar"
                            >
                              <XCircle size={18} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded">
                              <Search size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProtocols.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          Nenhum protocolo encontrado com os filtros aplicados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'new' && (
            <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Criar Novo Protocolo</h1>
                <p className="text-slate-500">Preencha os dados abaixo para gerar um novo registro de rastreabilidade.</p>
              </div>

              <form onSubmit={handleCreateProtocol} className="space-y-6">
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Título do Documento</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Contrato Social, Nota Fiscal 123..."
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Categoria</label>
                      <select 
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="">Selecione...</option>
                        <option value="Contrato">Contrato</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="RH">RH</option>
                        <option value="Jurídico">Jurídico</option>
                        <option value="Ofício">Ofício</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Descrição Detalhada</label>
                    <textarea 
                      rows={4}
                      placeholder="Descreva o conteúdo do documento..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Remetente (De:)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Nome da empresa ou setor"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.sender}
                        onChange={(e) => setFormData({...formData, sender: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Destinatário (Para:)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Nome do setor ou pessoa"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.recipient}
                        onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={formData.type === ProtocolType.PHYSICAL} 
                        onChange={() => setFormData({...formData, type: ProtocolType.PHYSICAL})}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Documento Físico</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={formData.type === ProtocolType.DIGITAL} 
                        onChange={() => setFormData({...formData, type: ProtocolType.DIGITAL})}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Documento Digital</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-95"
                  >
                    Gerar Protocolo
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-components
const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div className={`p-6 rounded-xl border border-slate-200 shadow-sm ${color} transition-transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <span className="text-2xl font-bold text-slate-800">{value}</span>
    </div>
    <p className="text-slate-600 font-medium text-sm uppercase tracking-wide">{label}</p>
  </div>
);

const StatusBadge = ({ status }: { status: ProtocolStatus }) => {
  const config = {
    [ProtocolStatus.PENDING]: { text: 'Pendente', class: 'bg-amber-100 text-amber-700 border-amber-200' },
    [ProtocolStatus.SIGNED]: { text: 'Assinado', class: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    [ProtocolStatus.DELIVERED]: { text: 'Entregue', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    [ProtocolStatus.CANCELLED]: { text: 'Cancelado', class: 'bg-red-100 text-red-700 border-red-200' },
  }[status];

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${config.class}`}>
      {config.text}
    </span>
  );
};
