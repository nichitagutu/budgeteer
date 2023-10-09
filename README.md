# Project intro
Budgeteer is a personal finance tracker app that <b>we developed for ourselves and all our friends</b> that are willing to get summarized statistics based on their income and expenses and understand the spending habits. <br>
<br>
It grew into the mini app from us  tracking personal finances in <i>Google Sheets</i> but still using <i>"Saved Messages"</i> on <i>Telegram</i> to note something "real quick" before actually adding into the tracking sheet.
<br>
<br>
<br>
![image](https://github.com/nichitagutu/budgeteer/assets/119045809/5ff16231-3997-4f49-9764-c39f7adc1125)


### Team 
The team behind this mini app is <a href="github.com/qpwedev"> qdev studio</a>. <br>
We are a small team developing various dApps, apps, TWAs and crafting cool motion/graphic design.

## Key functionality
The app allows to go through the<b> whole flow of the personal finances tracking</b>: <br>
<li> Authentificating with Telegram to create an account </li>
<li>Adding an income transaction and a tag</li>
<li>Adding a spend transaction and a tag</li>
<li>Viewing spending breakdown based on the tags (categories)</li>
<li>Viewing financial health rate (based on the spending to income ratio) </li>
<li>Viewing spending frequency </li>
<li>Viewing bills and subscriptions and automatically add them on to the monthly breakdown </li>

## TWA development potential
There's a great potential for the mini app development in the following directions:
<li>User wallets/cards integration</li>
<li>Advanced statistics</li>
<li>Inline commands integration for a quick transaction adding process</li>
<br>
We envision that the TWAs will become organic and familiar for the users and such a use case will showcase a real-world daily usage of the TWAs.

# Third-party integrations 
For the mini app development we used a couple of different integrations to support the PoC.

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="https://d3js.org/"> D3 by Observable</td>
    <td>Data visualisation</td>
    <td>All of the graphs, bars, charts</td>
  </tr>
  <tr>
    <td>react-ios-picker</td>
    <td>UI Implementation</td>
    <td>the date picker</td>
  </tr>
        <tr>
    <td><a href="https://github.com/ealush/emoji-picker-react"> ealush's library </td>
    <td>UI Implementation</td>
    <td>the emoji picker</td>
  </tr>
        <tr>
    <td><a href="https://www.react-spring.dev/"> React Spring</a></td>
    <td>UI Implementation</td>
    <td>UI framework</td>
  </tr>
           <tr>
    <td><a href="https://keen-slider.io/">Keen Slider</a></td>
    <td>UI Implementation</td>
    <td>UI library for sliders</td>
  </tr>
</table>

# Set up

To run front-end, use
```
yarn
```
```
yarn dev
```

To run back-end, use
```
docker-compose up --build
```
