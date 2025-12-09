# Sanity Native — React Native + Expo + Sanity (YouTube Example Repo)

Questa repository contiene il codice finale mostrato nel video YouTube dedicato a:

> Costruire da zero una mobile app con React Native + Expo, integrando Sanity come headless CMS.


Nel video partirai completamente da zero:

- bootstrap del progetto Expo
- configurazione di NativeWind
- creazione di componenti riutilizzabili
- setup del client Sanity
- fetch + rendering dei contenuti tramite GROQ

Questa repo serve solo come riferimento finale per chi vuole consultare il codice completo funzionante.

## Funzionalità implementate

- React Native + Expo con TypeScript
- NativeWind (Tailwind per React Native) configurato manualmente nel video
- Componenti riutilizzabili, stile “design system” minimal
- Sanity client configurato (projectId, dataset, apiVersion, useCdn)
- Query GROQ per leggere contenuti reali dal CMS
- Rendering dati tramite FlatList
- Struttura del progetto semplice e scalabile

## Come avviare il progetto

⚠️ Nota: nel video avvierai e configurerai tutto da zero.
Qui trovi solo la versione già pronta come riferimento.

Installa le dipendenze:
```sh
npm install
```

Avvia Expo:
```sh
npx expo start
```

Apri l’app:
- con l’app Expo Go sul telefono
- oppure via iOS Simulator / Android Emulator

## Configurazione Sanity

Modifica il file `/sanity/client.ts` con i valori del tuo progetto Sanity:
```ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})
```
📡 Esempio di fetch 
```ts
useEffect(() => {
  client.fetch(`*[_type == "work"]{_id, title, description}`)
    .then(setItems)
}, [])
```


## Styling con NativeWind

Esempio:
```tsx
<Text className="text-xl font-semibold">
  Titolo
</Text>
```

## Video collegato

Il progetto è stato realizzato per il video:

“React Native + Expo + Sanity in 15 minuti — App completa da zero”


## Nota importante

Questa repo non contiene passo-passo il setup:
👉 il setup completo (Expo, NativeWind, directory system, Sanity client) viene costruito in live durante il video.

Questa repository è solo l’esempio finale da consultare a video concluso.

