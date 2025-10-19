# CP5 - Calculadora Científica em React Native

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Este projeto é uma calculadora científica completamente funcional, desenvolvida como parte do Checkpoint 5 da disciplina de Mobile Application Development. O aplicativo foi construído utilizando React Native, Expo e TypeScript, seguindo as melhores práticas de desenvolvimento e componentização.

---

## ✨ Funcionalidades

O projeto implementa todos os requisitos obrigatórios e bônus solicitados.

### Funcionalidades Obrigatórias
- **Interface Intuitiva:** Um display claro que mostra a expressão completa do cálculo em tempo real.
- **Operações Básicas:** Adição, Subtração, Multiplicação e Divisão, com suporte para cálculos sequenciais (ex: `10 * 2 + 5`).
- **Operações Científicas:**
  - Potência ao quadrado (`x²`)
  - Raiz Quadrada (`√`)
  - Funções Trigonométricas (`sin`, `cos`, `tan`)
  - Porcentagem (`%`)
  - Constante Pi (`π`)
- **Controles Essenciais:** Botões para limpar tudo (`AC`), apagar o último dígito (`DEL`) e suporte para números decimais.
- **Tratamento de Erros:** Exibe uma mensagem de erro clara em caso de divisão por zero.
- **Limite de Dígitos:** O visor possui um limite de 6 dígitos para entrada e formata resultados longos para caber na tela.

### Funcionalidades Bônus (Implementadas)
- **Histórico de Cálculos:** Salva e exibe os últimos 5 cálculos realizados, com um botão para limpar o histórico.
- **Tema Claro e Escuro (Dark/Light Mode):** Um interruptor permite ao usuário alternar suavemente entre um tema claro e um escuro, adaptando toda a interface.

---

## 📸 Demonstração

### Modo Claro
*Tire um print do seu app no modo claro e adicione aqui! Substitua esta linha.*
`[INSERIR SCREENSHOT DO MODO CLARO AQUI]`

### Modo Escuro
*Tire um print do seu app no modo escuro e adicione aqui! Substitua esta linha.*
`[INSERIR SCREENSHOT DO MODO ESCURO AQUI]`

---

## 🚀 Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo:** Plataforma para facilitar o desenvolvimento, build e deploy de apps React Native.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
- **React Hooks:** Utilização de `useState` para gerenciamento de estado dos componentes.

---

## ⚙️ Como Executar o Projeto

Para rodar este projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** instalado em seu smartphone (iOS ou Android)

### Passos
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd calculadora-correta
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento Expo:**
   ```bash
   npx expo start
   ```

5. **Execute o aplicativo:**
   - Abra o aplicativo **Expo Go** em seu celular.
   - Escaneie o QR Code exibido no terminal. O aplicativo será carregado automaticamente em seu dispositivo.

---

## 📁 Estrutura de Pastas

O projeto foi organizado seguindo a estrutura sugerida para garantir a separação de responsabilidades e a manutenibilidade do código:

```
calculadora-correta/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── ButtonGrid.tsx
│   │   ├── Display.tsx
│   │   └── HistoryList.tsx
│   ├── screens/
│   │   └── CalculatorScreen.tsx
│   └── utils/
│       └── calculations.ts
├── App.tsx
└── README.md
```

---

## 👨‍💻 Autores

- **Guilherme** - RM: 557648
- **Larissa** - RM: 555136

---
Feito com ❤️ para o Checkpoint 5!