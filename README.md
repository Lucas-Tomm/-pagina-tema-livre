# Lendas do Octógono

Tema: Os 3 melhores lutadores de UFC do mundo
Nome: Lucas Corrêa Tomm
Turma: DSM3 2025
Unidade curricular: Programação de Aplicativos
Ano: 2026

## Sobre o projeto

Esta é a segunda etapa do projeto [site-tema-livre](https://github.com/Lucas-Tomm/site-tema-livre), que foi feito só com HTML em várias páginas. Agora o conteúdo vira uma **página única**, com a aparência feita em **CSS** e um formulário com validação feita em **JavaScript**.

O conteúdo (textos, tabela e formulários) é o mesmo da versão só com HTML. O que mudou foi o CSS, o JavaScript e a junção das cinco páginas em uma só, com menu que leva até cada seção.

## Estrutura do repositório

```
-pagina-tema-livre/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   ├── anderson-silva.jpg
│   ├── georges-st-pierre.jpg
│   ├── jon-jones.jpg
│   ├── octogono-ufc.jpg
│   └── ufc-fight-night.jpg
└── README.md
```

## Como abrir o projeto

Não precisa instalar nada. Basta baixar ou clonar o repositório e abrir o arquivo `index.html` no navegador (duplo clique).

```
git clone https://github.com/Lucas-Tomm/-pagina-tema-livre.git
```

## Seções da página

- **Início:** apresenta o tema, os três lutadores, as qualidades de um grande lutador e como navegar.
- **Sobre:** sumário, um texto sobre cada lutador, curiosidade, glossário e links externos.
- **Dados:** tabela com seis lutas marcantes.
- **Cadastro:** formulário de cadastro de torcedor, com validação em JavaScript.
- **Contato:** endereço fictício, horários e formulário de mensagem.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (sem bibliotecas)
- Git
- GitHub

## Como o CSS foi organizado

O arquivo `css/style.css` é dividido em partes comentadas: cores e medidas (variáveis em `:root`), regras básicas, cabeçalho e menu, conteúdo, tabela, formulários, rodapé e adaptação para celular. A parte do celular usa `@media (max-width: 600px)`: o menu vira duas colunas, os botões ocupam a largura toda e a tabela rola para o lado em vez de cortar o conteúdo.

## Formulário de cadastro e validação

O formulário de cadastro é tratado pelo arquivo `js/script.js`. Ao clicar em "Enviar cadastro", o JavaScript impede o envio normal, confere os dados e mostra uma mensagem na própria página.

Regras de validação:

| Campo | Regra |
| --- | --- |
| Nome completo | obrigatório, pelo menos 3 letras |
| E-mail | obrigatório, no formato nome@dominio.com |
| Data de nascimento | obrigatória, não pode ser no futuro, idade entre 10 e 120 anos |
| Altura | opcional; se preenchida, entre 1,00 m e 2,50 m |
| Quantas lutas assistiu | obrigatório, número inteiro de 0 a 500 |
| Melhor lutador, categoria e termos | obrigatórios |

Como os números são tratados:

- O texto digitado é limpo (espaços removidos e vírgula trocada por ponto) e convertido com `Number()` antes de ser usado.
- Texto vazio ou que não é número gera um erro (`throw new Error`) que é capturado com `try/catch` e vira uma mensagem para o usuário.
- Se houver qualquer erro, a página mostra a lista de problemas, marca os campos com borda vermelha e **não** calcula nada. Os campos continuam preenchidos e o usuário pode corrigir e enviar de novo.

Resultado calculado quando tudo está correto:

- idade, a partir da data de nascimento;
- média de lutas assistidas por ano de vida (lutas ÷ idade);
- nível de torcedor: 0 lutas = Novato; até 10 = Iniciante; até 50 = Torcedor; até 200 = Fã de carteirinha; mais que isso = Lenda do octógono.

O formulário de contato confere se nome, e-mail, assunto e mensagem foram preenchidos e mostra uma confirmação (é só uma simulação, nenhum dado é enviado).

## Recursos de acessibilidade aplicados

- Idioma da página definido como pt-BR.
- Link "Pular para o conteúdo" no início da página.
- Estrutura com `header`, `nav`, `main` e `footer`, e hierarquia de títulos sem pular nível.
- Texto alternativo nas imagens e `alt` vazio na imagem decorativa; `figure` com `figcaption` nas fotos.
- Tabela com `caption`, `scope` nos cabeçalhos e `time` nas datas.
- Formulários com `label` ligado ao campo por `for` e `id`, e `fieldset` com `legend`.
- Mensagens do formulário em uma caixa com `role="alert"`, que recebe o foco quando aparece, para o leitor de tela ler; campos com erro recebem `aria-invalid`.
- Foco do teclado visível e texto com contraste alto.

## Testes realizados

Os testes do formulário de cadastro e do formulário de contato foram feitos com um script em Node.js (biblioteca jsdom, que simula o navegador) que carrega o `index.html` e o `script.js`, preenche os campos, envia o formulário e confere a mensagem exibida.

| Teste | Entrada | Resultado esperado | Resultado |
| --- | --- | --- | --- |
| 1 | Cadastro todo vazio | lista com os 7 campos obrigatórios | OK |
| 2 | Dados válidos, 30 lutas | resultado com idade, média e nível "Torcedor" | OK |
| 3 | Lutas = -5 | erro "entre 0 e 500" | OK |
| 4 | Lutas = 12.5 | erro "número inteiro" | OK |
| 5 | Lutas = texto (abc) | erro "Preencha o campo lutas assistidas" | OK |
| 6 | Lutas = 999 | erro "entre 0 e 500" | OK |
| 7 | Lutas = 0 | resultado com nível "Novato" | OK |
| 8 | Nascimento em 2099 | erro "não pode estar no futuro" | OK |
| 9 | Altura = 3.5 | erro "entre 1,00 m e 2,50 m" | OK |
| 10 | E-mail sem @ | erro de e-mail inválido | OK |
| 11 | Nome com `<b>x</b>y` | texto mostrado como texto, sem virar HTML | OK |
| 12 | Corrigir os dados depois de um erro e enviar de novo | resultado correto, sem marcas de erro | OK |
| 13 | Contato vazio | mensagem dizendo o que falta preencher | OK |
| 14 | Contato preenchido | confirmação de envio (simulação) | OK |

Teste de teclado (só com a tecla Tab) e conferência da página no tamanho de celular: ainda preciso registrar aqui depois de fazer no navegador.

## Dificuldades

- Juntar cinco páginas em uma só exigiu trocar os links entre páginas por links para seções (`#sobre`, `#dados` etc.) e mudar os `id` dos campos, porque os dois formulários tinham campos com o mesmo `id` (`nome`, `email`, `mensagem`).
- Aprender a tratar o número digitado: `Number("abc")` não dá erro, dá `NaN`, então foi preciso conferir o resultado antes de usar.
- Manter a tabela legível no celular: a solução foi deixá-la rolar para o lado dentro de uma caixa.

## Fontes consultadas

- [Site oficial do UFC](https://www.ufc.com/)
- [UFC na Wikipédia](https://pt.wikipedia.org/wiki/Ultimate_Fighting_Championship)
- [Fight Matrix](https://www.fightmatrix.com/): ranking histórico, citado no site como debatível.
- Dados das lutas:
  - [UFC 165, Jones x Gustafsson](https://www.ufc.com/event/ufc-165)
  - [UFC 285, Jones x Gane](https://www.cbssports.com/mma/news/ufc-285-results-highlights-jon-jones-earns-heavyweight-title-with-first-round-submission-of-ciryl-gane/live)
  - [UFC 94, St-Pierre x Penn](https://www.sherdog.com/news/articles/St-Pierre-Stops-Penn-After-Fourth-16014)
  - [UFC 217, St-Pierre x Bisping](https://www.ufc.com/news/ufc-217-bisping-vs-st-pierre-final-results)
  - [UFC 64, Silva x Franklin](https://www.boxingscene.com/articles/full-ufc-64-results-new-champ-silva)
  - [UFC 126, Silva x Belfort](https://www.sherdog.com/news/news/Silva-Front-Kick-KOs-Belfort-at-UFC-126-29956)
  - [Maiores reinados de campeões do UFC](https://www.ufc.com/news/longest-ufc-title-reigns-legends-octagon) (defesas de título de Anderson Silva)

## Fontes e licenças das imagens

- `jon-jones.jpg`: https://s2-ge.glbimg.com/chsdAghW_4i2K_c9GeDdqzaqZpw=/0x0:8606x5737/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/p/G/vtwGj8RXCW2TLufaYCmA/gettyimages-2185190862.jpg
- `georges-st-pierre.jpg`: https://s2.glbimg.com/FTaaC62B0tXf6z2ONUXOotA0Z1I=/0x0:4368x2908/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2017/r/2/Yvw0aLT5OhtBBG1TBgWA/gettyimages-871061334.jpg
- `anderson-silva.jpg`: https://ufc.com/images/styles/background_image_sm/s3/2020-05/Anderson%20Silva%20Win%20Hero%20Belfort%20126.jpg?itok=b4wWu9Z8
- `ufc-fight-night.jpg`: imagem de divulgação do UFC Fight Night (Paramount+), encontrada na busca do Google; endereço da imagem: https://m.media-amazon.com/images/S/pv-target-images/b884b95ad95cdd7ea21c3b5c704e26fef62d2959f0f484b95e757c6575049777.jpg (reduzida para 1000 px de largura para a página carregar mais rápido).
- `octogono-ufc.jpg`: foto do octógono do UFC encontrada na busca do Google; endereço da imagem: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMb0sU7mEBZZTEqLVqxYPpqihEoyAaoqH5dkH3Rjut3w&s=10

Licença: são imagens de terceiros. As duas primeiras vêm do portal ge.globo.com, com créditos da Getty Images, a terceira vem do site do UFC e as duas últimas vêm de resultados de busca do Google. Foram usadas apenas para fins educacionais neste trabalho escolar, e os direitos são reservados aos autores.

## Autor

Nome: Lucas Corrêa Tomm
Turma: DSM3 2025
Ano: 2026
