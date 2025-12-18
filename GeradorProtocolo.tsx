import React, { useState } from 'react';
import { Sparkles, Loader2, Save, FileText } from 'lucide-react';
import { model } from './lib/gemini'; // Importando a config que criamos antes

interface ProtocoloData {
  titulo: string;
  categoria: string;
  prioridade: string;
  resumo_executivo: string;
}

export function GeradorProtocolo() {
  const [inputBruto, setInputBruto] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState<ProtocoloData>({
    titulo: "",
    categoria: "",
    prioridade: "Média",
    resumo_executivo: ""
  });

  const processarComIA = async () => {
    if (!inputBruto) return;
    setLoading(true);

    const prompt = `
      Analise o relato abaixo e extraia os dados para um protocolo.
      Relato: "${inputBruto}"
      Responda EXCLUSIVAMENTE em JSON:
      { "titulo": "string", "categoria": "string", "prioridade": "Alta|Média|Baixa", "resumo_executivo": "string" }
    `;

    try {
      const result = await model.generateContent(prompt);
      const data = JSON.parse(result.response.text());
      
      // Preenchimento automático do formulário
      setFormData(data);
    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Falha ao organizar dados com IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
        <FileText className="text-blue-600" /> Novo Protocolo Inteligente
      </h2>

      {/* Campo de Entrada da IA */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <label className="block text-sm font-medium text-blue-800 mb-2">Descreva o problema ou solicitação:</label>
        <textarea 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          value={inputBruto}
          onChange={(e) => setInputBruto(e.target.value)}
          placeholder="Ex: O servidor da contabilidade parou de responder desde as 09h..."
        />
        <button 
          onClick={processarComIA}
          disabled={loading || !inputBruto}
          className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {loading ? "IA Processando..." : "Organizar com IA"}
        </button>
      </div>

      <hr className="my-6" />

      {/* Formulário de Conferência */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título do Protocolo</label>
          <input 
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prioridade</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={formData.prioridade}
              onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resumo Executivo</label>
          <textarea 
            className="w-full p-2 border rounded-md"
            rows={4}
            value={formData.resumo_executivo}
            onChange={(e) => setFormData({...formData, resumo_executivo: e.target.value})}
          />
        </div>

        <button className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all">
          <Save size={20} /> Salvar Protocolo no Sistema
        </button>
      </div>
    </div>
  );
}
