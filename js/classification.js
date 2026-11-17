/* Regras de triagem do MVP. Compartilhadas pelo navegador e pelos testes Node. */
(function (root, factory) {
  const classifier = factory();
  if (typeof module === 'object' && module.exports) module.exports = classifier;
  if (root) root.OtisFlowClassifier = classifier;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function classify(data = {}) {
    const category = String(data.category || '').trim();
    const severity = String(data.severity || '').trim();
    const urgency = String(data.urgency || '').trim();

    if (category === 'Passageiro preso') {
      return { priority: 'Crítica', reason: 'Passageiro preso: prioridade crítica. Sinalizar atendimento humano imediato conforme os procedimentos oficiais.' };
    }
    if (data.safetyRisk === true || severity === 'Crítica' || urgency === 'Imediata') {
      return { priority: 'Crítica', reason: 'Risco à segurança, gravidade crítica ou urgência imediata informados: requer avaliação humana conforme os procedimentos aplicáveis.' };
    }
    if (category === 'Elevador parado') {
      return { priority: 'Alta', reason: 'Elevador parado com indisponibilidade total: prioridade alta para triagem e despacho.' };
    }
    if (category === 'Interrupção de energia' && severity !== 'Baixa') {
      return { priority: 'Alta', reason: 'Interrupção de energia com indisponibilidade: prioridade alta para inspeção e confirmação de operação segura.' };
    }
    if (category === 'Manutenção preventiva') {
      return { priority: urgency === 'Alta' ? 'Média' : 'Baixa', reason: 'Manutenção preventiva: prioridade definida pela urgência informada e programação.' };
    }
    if (urgency === 'Alta' || severity === 'Alta') {
      return { priority: 'Alta', reason: 'Urgência ou gravidade alta informada: prioridade alta para avaliação e encaminhamento.' };
    }
    if (severity === 'Baixa') {
      return { priority: 'Baixa', reason: 'Sem risco imediato informado: prioridade baixa para avaliação programada.' };
    }
    if (!category) {
      return { priority: 'Média', reason: 'Selecione a categoria para calcular a prioridade conforme os dados do relato.' };
    }
    return { priority: 'Média', reason: `${category}: prioridade média conforme gravidade informada. Avaliação profissional necessária.` };
  }

  return { classify };
});
