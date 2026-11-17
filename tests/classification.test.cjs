const test = require('node:test');
const assert = require('node:assert/strict');
const { classify } = require('../js/classification.js');

test('passageiro preso sempre recebe prioridade crítica', () => {
  for (const severity of ['Baixa', 'Média', 'Alta']) {
    assert.equal(classify({ category: 'Passageiro preso', severity, urgency: 'Normal' }).priority, 'Crítica');
  }
});

test('risco de segurança, gravidade crítica e urgência imediata elevam para crítica', () => {
  assert.equal(classify({ category: 'Ruído anormal', safetyRisk: true }).priority, 'Crítica');
  assert.equal(classify({ category: 'Falha técnica', severity: 'Crítica' }).priority, 'Crítica');
  assert.equal(classify({ category: 'Outros', urgency: 'Imediata' }).priority, 'Crítica');
});

test('elevador parado recebe prioridade alta mesmo sem gravidade selecionada', () => {
  assert.equal(classify({ category: 'Elevador parado', severity: 'Baixa' }).priority, 'Alta');
});

test('falha de energia e gravidade ou urgência alta são encaminhadas como alta', () => {
  assert.equal(classify({ category: 'Interrupção de energia', severity: 'Média' }).priority, 'Alta');
  assert.equal(classify({ category: 'Ruído anormal', severity: 'Alta' }).priority, 'Alta');
  assert.equal(classify({ category: 'Outros', urgency: 'Alta' }).priority, 'Alta');
});

test('manutenção preventiva respeita programação e urgência definida', () => {
  assert.equal(classify({ category: 'Manutenção preventiva', severity: 'Baixa', urgency: 'Normal' }).priority, 'Baixa');
  assert.equal(classify({ category: 'Manutenção preventiva', severity: 'Baixa', urgency: 'Alta' }).priority, 'Média');
});

test('classificação padrão é média e sempre explica o motivo', () => {
  const result = classify({ category: 'Problema nas portas', severity: 'Média', urgency: 'Normal' });
  assert.equal(result.priority, 'Média');
  assert.match(result.reason, /Problema nas portas/);
  assert.ok(result.reason.length > 20);
});
