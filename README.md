# Music Library Application

Este é um projeto React que exibe uma biblioteca de músicas, permitindo que os usuários façam buscas, explorem artistas e gêneros, e adicionem artistas à playlist. A aplicação utiliza rotas dinâmicas para lidar com buscas e estado persistente para manter as categorias.

## Funcionalidades Principais

- **Busca**: Permite a pesquisa de músicas via uma barra de pesquisa.
- **Categorias**: Exibição dinâmica de categorias (gêneros ou artistas), podendo ser reordenadas ou removidas.
- **Carregamento Local**: As categorias carregadas são salvas no `localStorage` para persistência.
- **Rotas Dinâmicas**: URLs dinâmicas com `useParams` para lidar com buscas.
- **Play de Faixas**: Integração de um player para faixas de músicas com pré-visualização.

## Acesso
Disponivel no <a href='https://joaovictorfdebarros.github.io/Music_Library'>GitHub Pages</a>

## Funcionamento
Os dados são provenientes da <a href='https://developers.deezer.com/api'> Api do Deezer </a>, que permite o acesso às imagens e demosntrações das músicas de modo gratuíto para fins nao comerciais, como deescrito nos <a href='https://developers.deezer.com/termsofuse'>Termos de uso </a>.
A aplicação faz requisições à um midleware simples, hospedado na plataforma <a href='https://vercel.com/'>Vercel </a> que controla o fluxo de dados, disponivel em <a href='https://musiclibraryapi.vercel.app/api'>https://musiclibraryapi.vercel.app/api</a>

## Instalação
```bash
git clone https://github.com/JoaoVictorFdeBarros/Music_Library.git
```

```bash
npm install
```

```bash
npm start
```
