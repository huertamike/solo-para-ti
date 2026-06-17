// Base de datos de las canciones elegidas para el regalo de tu novia.
// Contiene letras en formato LRC [mm:ss.xx] para sincronización y IDs de YouTube compatibles.

const songsData = [
  {
    id: "si-supieras",
    title: "Si Supieras",
    artist: "Kevin Kaarl",
    album: "Hasta el Fin del Mundo",
    cover: "assets/covers/si-supieras.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3c/5a/27/3c5a2771-6a80-5920-56ea-67fc851938e8/mzaf_11248799386361452702.plus.aac.p.m4a",
    youtubeId: "J5RyC2nW0Oo", // Versión oficial (Kevin Kaarl - Topic) perfectamente sincronizada
    audioUrl: "assets/audio/Si Supieras.m4a",
    syncOffset: 0.0, // Reseteado a 0.0 ya que el audio empieza inmediatamente
    comment: "(Yo no te pienso fallar jamas Y siento que tu tampoco lo haras No puedo dejar de pensar en ti y nada mas En tus ojos miel En tu forma de besar En tu forma de querer)",
    lyrics: `[00:00.00] (Instrumental)
[00:21.00] Si supieras todo lo que pienso cuando despierto
[00:26.50] No dudarías jamás, jamás de mi amor
[00:32.00] Sentir tu respiración junto a la mía
[00:37.00] Me hizo entender que no eres fría
[00:42.00] Que eres mejor, mejor, mejor
[00:46.50] Despertar es un alivio
[00:50.00] Por ver que tú estás conmigo
[00:53.00] Y que nos queremos los dos
[00:58.00] Me sorprende que tú me quieras
[01:01.00] De verdad, honestamente
[01:04.00] Que no eres de papel
[01:09.00] Yo ya no tengo ninguna duda
[01:13.00] Y me entrego a ti, a ti, a ti
[01:20.00] Si supieran cómo yo te puedo llegar a ver
[01:25.00] Nunca me dirían que no
[01:29.00] Pero ya diles adiós, ya no queda más
[01:32.00] Que tú, que tú y yo
[01:37.00] Que tú, que tú, que tú y yo
[01:48.00] Yo no te pienso fallar jamás
[01:53.00] Y siento que tú tampoco lo harás
[01:58.00] No puedo dejar de pensar en ti nada más
[02:02.00] En tus ojos miel
[02:06.00] En tu forma de besar
[02:10.00] En tu forma de querer, pero
[02:15.00] Si supieran como yo te puedo llegar a ver
[02:20.00] Nunca me dirían que no
[02:24.00] Pero ya diles adiós
[02:28.00] Ya no queda más que tú y yo
[02:40.00] Yo no te pienso fallar jamás
[02:45.00] Y siento que tú tampoco lo harás
[02:50.00] No puedo dejar de pensar en ti nada más
[02:55.00] En tus ojos miel
[02:59.00] En tu forma de besar
[03:03.00] En tu forma de querer, pero
[03:08.00] Si supieran como yo te puedo llegar a ver
[03:13.00] Nunca me dirían que no
[03:17.00] Pero ya diles adiós
[03:21.00] Ya no queda más que tú y yo`
  },
  {
    id: "te-quiero-tanto",
    title: "te quiero tanto",
    artist: "Kevin Kaarl",
    album: "Hasta el Fin del Mundo",
    cover: "assets/covers/te-quiero-tanto.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/36/8c/a5368c47-f752-aae7-d20a-1780df6edb5c/mzaf_8011801272974753606.plus.aac.p.m4a",
    youtubeId: "Oq79WOe2I_s", // Versión oficial (Kevin Kaarl - Topic) perfectamente sincronizada
    audioUrl: "assets/audio/te quiero tanto.m4a",
    syncOffset: 0.0, // Reseteado a 0.0 ya que el audio empieza inmediatamente
    comment: "(Te siento al cantar Y al esuchar cada cancion bonita que hable del amor de lo que siento ayer y hoy Siempre te llevo al despertar)",
    lyrics: `[00:00.00] (Instrumental)
[00:07.00] Nunca digas que te vas sin querer regresar
[00:12.50] Cuando de ti me enamoré, cuando cien años ya te amé
[00:19.50] Llévame siempre al recordar
[00:23.00] Viéndote bailar en aquel cerro Coronel
[00:28.50] Y ya mil veces te besé, y no lo niego, me clavé
[00:35.50] Llévame siempre al recordar
[00:38.50] Te he visto en frente, sonriente, valiente, te quiero tanto
[00:46.50] Vestido blanco, en el medio tu alma, te quiero tanto
[00:54.50] Me duele fuerte pensar que algún día te encuentre ausente
[01:02.50] Me duele fuerte pensar que algún día te encuentre ausente
[01:12.00] Te siento al cantar y al escuchar cualquier canción
[01:19.50] Bonita que hable del amor, de lo que siento ayer y hoy
[01:28.00] Siempre te llevo al despertar
[01:32.00] Te vi a los ojos bien
[01:36.00] Sentí cariño fiel
[01:40.00] Si me rompiera aquí
[01:44.00] Esperaría por ti
[01:47.50] Te he visto en frente, sonriente, valiente, te quiero tanto
[01:55.50] Vestido blanco, en el medio tu alma, te quiero tanto
[02:03.50] Me duele fuerte pensar que algún día te encuentre ausente
[02:11.50] Me duele fuerte pensar que algún día te encuentre ausente
[02:21.50] Te vi a los ojos bien
[02:25.50] Sentí cariño fiel
[02:29.50] Si me rompiera aquí
[02:33.50] Esperaría por ti`
  },
  {
    id: "toda-esta-ciudad",
    title: "Toda esta ciudad",
    artist: "Kevin Kaarl",
    album: "Toda Esta Ciudad - Single",
    cover: "assets/covers/toda-esta-ciudad.png?v=6.20",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/64/be/0a/64be0a84-e580-cb68-c57f-b757bbb0216f/mzaf_12988081120797150721.plus.aac.p.m4a",
    youtubeId: "UL_7Cgx0XEU", // ID anterior como fallback de YouTube
    audioUrl: "assets/audio/Toda esta ciudad.m4a",
    syncOffset: 0.0,
    videoSyncOffset: 1.5, // El canto en tu video empieza a los 0:20.5 aprox, por lo que adelantamos 1.5s para sincronizar con la letra oficial (0:22)
    comment: "(Siente mi alma, siempre fue pa' ti Te amo más de lo que tú crees Cuando arda toda esta ciudad ya fue y estaré aquí)",
    lyrics: `[00:00.00] (Instrumental)
[00:22.00] Odias todita esta ciudad
[00:28.00] La gente te ha obligado a despedir
[00:34.00] Días contados pa' escapar
[00:40.00] Si lo haces, recuerda, estaré aquí
[00:47.00] Y no es mucho
[00:52.50] No soy tan distinto a los demás, mi niña
[00:59.00] Pero si te vas, recuerda
[01:05.00] Estaré aquí
[01:09.00] Mm-mm
[01:19.00] Te ha mentido toda esta ciudad
[01:25.00] ¿Qué han hecho? Si eres de admirar
[01:31.00] Y mis brazos son para cuidar
[01:35.00] Mi amor
[01:38.00] Estaré aquí
[01:43.00] Siente mi alma, siempre fue pa' ti
[01:49.00] Te amo más de lo que tú crees
[01:55.00] Cuando arda toda esta ciudad
[01:58.50] Ya fue
[02:01.50] Y estaré aquí
[02:06.00] Si te han visto
[02:09.00] Le has robado el brillo a la luna y a Venus
[02:15.50] Me has amado en guerra, dulzura
[02:22.00] Llevas tu luz
[02:28.00] Y no es mucho
[02:33.50] No soy tan distinto a los demás, mi niña
[02:40.00] Pero si te vas, recuerda
[02:46.00] Estaré aquí
[02:50.00] Mm-mm
[03:00.00] Te ha mentido toda esta ciudad
[03:06.00] ¿Qué han hecho? Si eres de admirar
[03:12.00] Y mis brazos son para cuidar
[03:16.00] Mi amor
[03:19.00] Estaré aquí
[03:24.00] Siente mi alma, siempre fue pa' ti
[03:30.00] Te amo más de lo que tú crees
[03:36.00] Cuando arda toda esta ciudad
[03:39.50] Ya fue
[03:42.50] Yo estaré aquí`
  },
  {
    id: "hasta-donde-te-quiero",
    title: "Hasta Donde Te Quiero",
    artist: "La Rondalla de Saltillo",
    album: "Hasta Donde Te Quiero",
    cover: "assets/covers/hasta-donde-te-quiero.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b6/d6/d2/b6d6d21e-739c-ea01-171e-bab1d14b2701/mzaf_8097543667161736848.plus.aac.p.m4a",
    youtubeId: "pbmbHdjcFbY", // Versión clásica perfectamente sincronizada
    audioUrl: "assets/audio/¿Hasta Dónde Te Quiero.m4a",
    syncOffset: 0.0,
    comment: "(No preguntes a mi alma cuanto te amo Porque para mi amor no hay distancias ni fronteras Y si quieres saber cuanto he de amarte Te amo mas alla de tu vida, de la mia, y del tiempo, Porque poca es la eternidad para adorarte)",
    lyrics: `[00:00.00] (Instrumental)
[00:14.00] Que hasta dónde te quiero
[00:18.50] Siempre me has preguntado
[00:22.50] No te sé decir
[00:25.50] Si parece imposible
[00:29.50] Alcanzar una estrella
[00:33.50] Yo lo haría por ti
[00:37.00] Que hasta dónde te quiero
[00:41.50] Esa necia pregunta
[00:45.00] No responderé
[00:48.00] Si en mi amor no hay distancias
[00:52.50] Si no hay cerca, no hay lejos
[00:56.00] ¿Cómo te haré saber?
[01:00.00] Júzgame como un loco
[01:03.50] Piensa tú lo que quieras
[01:07.00] Yo te quiero así
[01:10.00] ¿Quieres que yo te diga
[01:13.50] Hasta dónde te quiero?
[01:16.50] Hasta donde tus ojos no ven
[01:22.00] No preguntes a mi alma cuánto te amo
[01:29.00] Porque para mi amor no hay distancias ni fronteras
[01:35.50] Y si quieres saber cuánto he de amarte
[01:41.50] Te amo más allá de tu vida, de la mía y del tiempo
[01:48.00] Porque es poca la eternidad para adorarte
[01:54.00] Si tú quieres, soy loco
[01:58.00] Píntame como quieras
[02:01.00] Siempre esclavo de ti seré
[02:05.00] ¿Quieres que yo te diga
[02:08.00] Hasta dónde te quiero?
[02:11.00] Hasta donde tus ojos no ven
[02:16.00] Hasta donde tus ojos no ven
[02:21.50] Hasta donde tus ojos no ven`
  },
  {
    id: "la-distancia",
    title: "La Distancia",
    artist: "Manuel Medrano",
    album: "Manuel Medrano",
    cover: "assets/covers/la-distancia.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/23/09/18/23091892-5866-5728-1824-4865a6b790fd/mzaf_8514783037452465205.plus.aac.p.m4a",
    youtubeId: "dH7_By3Y2i0", // Video Oficial (Manuel Medrano) perfectamente sincronizado
    audioUrl: "assets/audio/La Distancia.m4a",
    syncOffset: 0.0,
    comment: "(Hoy me acuerdo de tus besos aun que ya no estes aqui Y de lo mucho que he querido volver a tocarte niña no te olvides mi)",
    lyrics: `[00:00.00] (Instrumental)
[00:12.00] No me acordaba de lo rico que era tocar tu piel
[00:18.00] De lo bien que se sentía, abrazarte
[00:23.50] Todo lo que me decías al mirarme
[00:28.00] Y como tus manos
[00:30.50] Sacudían todos esos problemas de mí
[00:35.00] Y me hacían olvidar lo cruel que era el mundo
[00:39.50] Hoy me acuerdo de tus besos aunque ya no estés aquí
[00:46.00] Y de lo mucho que he querido
[00:49.00] Volver, a tocarte niña
[00:52.00] No te olvides de mí
[00:54.50] Ojala que nunca se te olvide
[00:59.00] A donde quedamos de encontrarnos
[01:03.00] Allá, en el futuro
[01:05.50] Donde nadie conoce allá
[01:09.50] En la distancia que podrá curar,
[01:14.00] Todo lo que nos hicimos ayer
[01:17.50] Por qué algún día te mirare a los ojos
[01:22.00] Y sabremos que a pesar de todo
[01:26.00] Es como si entre nosotros
[01:30.00] Nada fuera a terminar
[01:46.50] Ojala que nunca se te olvide
[01:50.50] A donde quedamos de encontrarnos
[01:54.50] Allá en el futuro
[01:57.50] Donde nadie conoce allá
[02:01.50] En la distancia que podrá curar,
[02:05.50] Todo lo que nos hicimos ayer
[02:09.50] Por qué algún día te mirare a los ojos
[02:14.00] Y sabremos que a pesar de la distancia
[02:18.00] Es como si entre nosotros
[02:22.00] Nada fuera a terminar`
  },
  {
    id: "reloj-ingrato",
    title: "Reloj Ingrato (Acústica)",
    artist: "José y el Toro",
    album: "Reloj Ingrato",
    cover: "assets/covers/reloj-ingrato.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ee/c3/c3/eec3c353-d63f-1c9a-d69f-e936491dad7d/mzaf_8372333272221499013.plus.aac.p.m4a",
    youtubeId: "VwSgCKvLpBY", // Versión Oficial Acústica (José y el Toro) perfectamente sincronizada
    audioUrl: "assets/audio/Reloj Ingrato.m4a",
    syncOffset: 0.0,
    comment: "(Contigo hasta la eternidad se siente como un instante Cuando estamos juntos el tiempo es injusto Las horas son minutos los minutos segundos Pero si te alejas corazon el tiempo se congela)",
    lyrics: `[00:00.00] (Instrumental)
[00:04.00] ¿A dónde fuiste corazón?
[00:07.50] Te tardaste una vida
[00:11.00] Parece una eternidad
[00:14.00] Cuando compras en la esquina
[00:17.50] Si no estamos cerca
[00:20.50] El tiempo quema
[00:23.50] Las horas son largas
[00:26.00] Frías y eternas
[00:29.00] Pero si te acercas corazón
[00:33.00] El tiempo vuela
[00:36.50] Reloj, hagamos un trato
[00:40.50] Y congélate el rato
[00:44.00] Que me veas junto a ella
[00:48.00] Y si ves
[00:50.00] Que de mí ella se aleja
[00:53.00] Hasta que vuelva, por favor acelera
[01:08.00] ¿A dónde vas tan rápido?
[01:11.50] Si hace nada que llegaste
[01:15.00] Contigo hasta la eternidad
[01:18.50] Se siente como un instante
[01:22.00] Cuando estamos juntos el tiempo es injusto
[01:28.00] Las horas son minutos
[01:30.50] Los minutos segundos
[01:33.50] Pero si te alejas, corazón
[01:37.00] El tiempo se congela
[01:40.50] Reloj, hagamos un trato
[01:44.50] Y congelate el rato
[01:48.00] Que me veas junto a ella
[01:52.00] Y si ves
[01:54.00] Que de mí ella se aleja
[01:57.00] Hasta que vuelva, por favor acelera`
  },
  {
    id: "amor-completo",
    title: "Amor Completo",
    artist: "Mon Laferte",
    album: "Mon Laferte Vol. 1",
    cover: "assets/covers/amor-completo.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/2a/30/a52a30c4-1b05-102b-3914-f518a2d08924/mzaf_4992086678498344351.plus.aac.p.m4a",
    youtubeId: "PQlG1gznMBE", // Video Oficial (Mon Laferte) perfectamente sincronizado
    audioUrl: "assets/audio/Amor Completo.m4a",
    syncOffset: 0.0,
    videoSyncOffset: 31.8, // Adelantado 31.8s en video para que empiece a los 0:01 (canto oficial a los 0:32.8)
    comment: "(Arrullame Ahogame Aplastame Desarmame Comeme y Fumame Amor inquierto Amor drogado Amor completo)",
    lyrics: `[00:00.00] (Instrumental)
[00:32.80] No, no hay nada mejor
[00:38.19] Que probar un primer beso, y más de ti
[00:45.61] Veo tantos colores y todos mis sentidos
[00:52.82] Estallarán de tanto amarte
[01:05.53] ¿Cómo se puede sentir
[01:10.92] Tantas cosas en tan poco tiempo, y no morir?
[01:18.41] Tú puedes hacer un gran nido en mi universo
[01:32.72] Puedes hacer lo que quieras conmigo
[01:43.94] Yo siento que tú me querí
[01:48.43] Como yo te quiero
[01:52.22] Acuéstate a mi lado
[01:55.95] Esta noche te quiero vivir
[02:02.38] Arrúllame, ahógame, aplástame
[02:06.46] Desármame, cómeme y fúmame
[02:09.90] Amor inquieto
[02:13.63] Amor drogado
[02:17.75] Amor completo
[02:27.30] Oh, cada vez que yo
[02:33.13] Te veo y que te pienso
[02:39.47] Siento que florezco
[02:43.30] Me duele estar tan lejos
[02:47.39] No es fácil que no estés aquí
[02:51.00] Y aún así puedes hacer
[02:54.50] Lo que quieras de mí
[03:02.00] Yo siento que tú me querí
[03:06.00] Como yo te quiero
[03:10.00] Acuéstate a mi lado
[03:14.00] Esta noche te quiero vivir
[03:20.00] Arrúllame, ahógame, aplástame
[03:24.00] Desármame, cómeme y fúmame
[03:28.00] Amor inquieto
[03:32.00] Amor drogado
[03:36.00] Amor completo
[03:40.00] Amor inquieto
[03:44.00] Amor completo`
  },
  {
    id: "morfeo",
    title: "MORFEO",
    artist: "WOS",
    album: "Descartable",
    cover: "assets/covers/morfeo.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/a3/49/3a/a3493a05-3a00-654b-3a22-0de6fde4d6b2/mzaf_17841733108565847051.plus.aac.p.m4a",
    youtubeId: "4gOMr9xK0bI", // Video Oficial (WOS) perfectamente sincronizado
    audioUrl: "assets/audio/WOS - MORFEO (Video Oficial).m4a",
    syncOffset: 0.0, // Reseteado a 0.0 ya que el audio empieza inmediatamente
    videoSyncOffset: 10.0, // Adelantado 10s en video (antes 5s) para compensar desfase de 5s reportado y coincidir con el canto
    comment: "(Ya entendi porque gusto de lo calido Es que pensar en vos es como acercarse al fuego Ese que hizo cenizas del oraculo Incinerando destinios para escribirlos de nuevo)",
    lyrics: `[00:00.00] (Instrumental)
[00:09.00] Parece tan azaroso aquello que nos salva
[00:14.00] Se vuelve tan valioso el beso de la calma
[00:19.00] El peso de las almas and su abrazo ansioso
[00:23.00] Enlazadas entre sí en el borde de la cama
[00:27.50] Como si nada me pasara, posando
[00:31.50] Entre miradas desgastadas, pensando
[00:35.50] Siempre un poco más de lo necesario
[00:39.50] Recordé tu piel, mi fiel confesionario
[00:43.50] Entre humo y otra reflexión barata
[00:47.50] No oculto mis temores, porque solo me delatan
[00:51.50] Asumo los errores y así no me matan
[00:55.50] A lo sumo uso esta vida como fe de erratas
[01:00.00] Siento un vacío, como vos en el atardecer
[01:04.00] Tu figura tan lejana se quiere desvanecer
[01:08.00] Estoy loopeado en un sueño en el que no puedo correr
[01:12.00] Mi ser no puede gritar, nada me saca la sed
[01:16.00] Me preguntas: ¿A dónde vas? ¿Por qué te escapas?
[01:20.00] Es que capaz, yo solo le sumo un peso de más
[01:24.00] Bebiendo el vaso como si en el fondo hallara paz
[01:28.00] Pero pa' encontrarla hay que tomar otro más
[01:32.00] Ahora, ya no culpo a las rutinas
[01:36.00] Si algunas te aplacan y otras te salvan la vida
[01:40.00] Cuando creí que ya me la sabía
[01:44.00] Llegaste pa' llenarme los ojos de intriga
[01:48.00] Quizás peque de egoísta empedernido
[01:52.00] Porque cuento la tristeza y la felicidad la vivo
[01:56.00] Convivo with el vacío y lo convido
[02:00.00] Hacia el alojo de otro oído pa' no hablar solo conmigo
[02:04.50] Bah
[02:06.50] En algún momento tengo que salir
[02:10.00] No puedo estar viviendo todo el día en mí
[02:14.00] Buscando las razones de lo que no es
[02:17.50] O las explicaciones de lo que no fui
[02:21.50] En esta maratón que no tiene final
[02:25.50] La multitud que corre sin saber por qué
[02:29.50] Buscando algún resquicio para respirar
[02:33.50] Y transformar la sombra en una luz marfil
[02:38.00] Hoy vuelvo a caminar
[02:41.50] Queriendo encontrar alguna señal en el tiempo
[02:45.50] Hoy vuelvo a soñar
[02:49.50] O a imaginar alguna señal todo el tiempo`
  },
  {
    id: "yoko",
    title: "YOKO",
    artist: "Álvaro Díaz",
    album: "Sayonara",
    cover: "assets/covers/yoko.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8a/99/0f/8a990f88-18cf-e8d3-3fa8-800ff1c94d3c/mzaf_6822729556506803342.plus.aac.p.m4a",
    youtubeId: "T89IqbAF9Ik", // Video Oficial (Alvaro Diaz) perfectamente sincronizado
    audioUrl: "assets/audio/Alvaro Diaz - Yoko (Official Video).m4a",
    syncOffset: 0.0,
    comment: "(No es secreto, tú me tiene' loco Me siento en LSD cuando te toco Soy un tonto y mil vece' me equivoco Te quiero siempre a mi ladito como Yōko)",
    lyrics: `[00:00.00] (Instrumental)
[00:02.00] No es secreto, tú me tiene' loco
[00:05.00] Me siento en LSD cuando te toco
[00:08.00] Soy un tonto y mil vece' me equivoco
[00:11.00] Te quiero siempre a mi ladito como Yoko
[00:14.00] Oh, no te vaya' nunca
[00:17.00] Oh, no te vaya' nunca
[00:20.00] Oh, no te vaya' nunca
[00:23.00] Oh, no te vaya' nunca
[00:26.00] Ey, ah
[00:27.00] Prefiero tus labio' a cualquier premio
[00:30.50] Prefiero tu boca que un número uno
[00:34.00] ¿Cómo llegué a ser tu rey? Eso e' un misterio
[00:38.00] Un atardecer contigo no lo cambio por ninguno
[00:42.50] Si tú me quisiste cuando ni yo me quería
[00:46.00] Que tú me quisiste cuando ni yo me quería, eh
[00:50.00] Yo tan T'Chala, tú tan princesa Diana
[00:54.00] En la cama Lana Rhoades, en la calle siempre es pana
[00:58.00] Soñé que estaba contigo en la portada
[01:02.00] De Vogue, los dos vestido' 'e Prada
[01:05.50] Que nos grabábamo' en el sofá Eames de la sala
[01:09.50] Y lo enseñaba en Sunset y Cannes to' el mundo lo amaba
[01:13.50] Este es el amor del cual mi abuelito me hablaba
[01:17.50] Querer estar a tu la'o hasta que el pelo esté lleno de cana'
[01:22.00] Yo quiero, quiero, quiero, quiero verte brillar por siempre
[01:26.00] Yo quiero, quiero, quiero, quiero verte bailar por siempre, yeah
[01:31.00] Tú y yo por siempre
[01:34.50] Baby, tú y yo por siempre
[01:39.00] No es secreto, tú me tiene' loco
[01:43.00] Me siento en LSD cuando te toco
[01:47.00] Soy un tonto y mil vece' me equivoco
[01:51.00] Te quiero siempre a mi ladito como Yoko
[01:55.50] Oh, no te vaya' nunca
[01:59.50] Oh, no te vaya' nunca
[02:03.50] Oh, no te vaya' nunca
[02:07.50] Oh, no te vaya' nunca
[02:11.50] Oh, no te vaya' nunca
[02:15.50] Oh, no te vaya' nunca
[02:19.50] Oh, no te vaya' nunca
[02:23.50] Oh, no te vaya' nunca
[02:27.50] Oh, no te vaya'`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = songsData;
}
