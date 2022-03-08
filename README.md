# PROJETO: TRIVIA

👋 Bem-vinda(o)! 

_Projeto em grupo proposto no curso de Desenvolvimento Web da_ [_Trybe_](https://www.betrybe.com/)

Acesse: [_Trivia_](https://trivia-livid-iota.vercel.app/)

Desenvolvedores:
 - [_Renata Nunes_](https://github.com/renatapnunes)
 - [_Marcos Siqueira_](https://github.com/MGSiqueira)
 - [_Júlio Mota_](https://github.com/juliocamposmota)
 - [_Bruno Costa_](https://github.com/Dock32)
 - [_Sarah Gonçalves_](https://github.com/sarahgsb)

## Contexto
Trivia é um estilo de jogo de perguntas e respostas tradicional nos EUA, que aborda curiosidades referentes à assuntos diversos.

Neste projeto, desenvolvemos uma versão deste jogo onde o usuário pode escolher algumas modalidades para joga-lo, selecionando categorias específicas e o nível de dificuldade das perguntas. Cada partida é composta por cinco perguntas e a pontuação no jogo leva em conta o tempo de resposta do usuário, que pontua mais à medida em que responde mais rápido.

Tecnicamente, a principal proposta deste projeto é explorar o uso do **Redux**, juntamente com o **React**, configurando uma *store*, *reducers* e *actions*.

## Instalação
Pré-requisitos:

 - Ter instalado em sua máquina o NPM
 
 No terminal da sua máquina digite a seguinte sequência de comandos:

     git clone git@github.com:renatapnunes/starwars-planets-search.git
     npm install
     npm start
Caso a aplicação não inicie sozinha, acesse no seu browser `http://localhost:3000/`

## Aplicação

_Login:_
![Login](https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia_login.png)

Para iniciar a partida, o usuário insere na página inicial seu email e o nome que deseja usar na partida. Caso o email escolhido esteja cadastrado no [_Gravatar_](https://br.gravatar.com/), a aplicação utilizará seus dados para obter por exemplo, o avatar do jogador.

_Configurações:_
![Settings](https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia_settings.png)

Antes de iniciar a partida, o jogador tem a opção de escolher a categoria das perguntas, o nível de dificuldade e seu tipo, sendo as opções verdadeiro/falso ou múltipla escolha. Caso, o usuário não faça esta configuração, a aplicação selecionará modo aleatório para os três campos.

_Tela de jogo:_
![Game](https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia_question.png)

Iniciada a partida, na tela de pergunta será exibido o nome e o avatar do usuário, sua pontuação até o momento na partida, o número de perguntas já feitas, a categoria da pergunta, um cronômetro decrescente e as opções de resposta.

_Telas de feedback:_
</br>
<img alt="Feedback positivo" width="300px" height="350px" src="https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia_feedback_positive.png" />
<img alt="Feedback negativo" width="330px" height="350px" src="https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia_feedback_negative.png" />

Após respondidas às cinco questões, uma tela de feedback é exibida, mostrando a pontuação alcançada e o número de acertos. O usuário tem então a opção de ir para a tela de ranking verificar sua colocação ou iniciar uma nova partida.

_Gif de uma partida completa:_
![Gif aplicação](https://github.com/renatapnunes/trivia/blob/main/images-readme/Trivia.gif)

## Tecnologias

Este projeto foi desenvolvido com ***React.js*** e ***Redux***.

Para estiliza-lo, usou-se ***CSS 3*** e para garantir um código limpo, foi usado o ***ESLint***.

##### Api:
A aplicação consome dados da seguinte Api REST:  [_Open Trivia Database_](https://opentdb.com/api_config.php)

As URLs usadas para as requisições foram:
```
https://opentdb.com/api_token.php?command=request
```
URL que retorna um token, necessário para fazer a requisição das perguntas. O uso desse token garante por exemplo, que as perguntas não serão repetidas para aquele usuário durante um determinado tempo.

```
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
```
URL utilizada para fazer a requisição das perguntas, cujo retorno são cinco perguntas e os dados referentes à elas.

##### Gravatar:
O [_Gravatar_](https://br.gravatar.com/) é um serviço que permite deixar o avatar global a partir de um email cadastrado. Na requisição dos dados à sua Api, é necessário informar o email do usuário transformado em uma ***hash MD5***. Para esta conversão foi utilizado o **CryptoJS**.

```
https://www.gravatar.com/avatar/${hash-gerada}
```

## Meus contatos
Estou aberta a feedbacks sobre este projeto.

Caso queria colaborar, fique a vontade para entrar em contato pelo meu:
👉 [Linkedin](https://www.linkedin.com/in/renata-p-nunes/)

Vou ficar muito feliz em aprender algo novo! 😄
