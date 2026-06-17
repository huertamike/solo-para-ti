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
    youtubeId: "OKJFr9vG-yc", // Versión con letra compatible
    comment: "(Yo no te pienso fallar jamas Y siento que tu tampoco lo haras No puedo dejar de pensar en ti y nada mas En tus ojos miel En tu forma de besar En tu forma de querer)",
    lyrics: `[00:00.00] (Instrumental)
[00:14.00] Si supieras todo lo que pienso cuando despierto
[00:19.50] No dudarías jamás, jamás de mi amor
[00:25.00] Sentir tu respiración junto a la mía
[00:30.00] Me hizo entender que no eres fría
[00:35.00] Que eres mejor, mejor, mejor
[00:39.50] Despertar es un alivio por ver que tú estás conmigo
[00:46.00] Y que nos queremos los dos
[00:51.00] Me sorprende que tú me quieras de verdad, honestamente
[00:57.00] Que no eres de papel
[01:02.00] Yo ya no tengo ninguna duda
[01:06.00] Y me entrego a ti, a ti, a ti
[01:13.00] Si supieran como yo te puedo llegar a ver
[01:18.00] Nunca me dirían que no
[01:22.00] Pero ya diles adiós
[01:25.00] Ya no queda más que tú, que tú y yo
[01:30.00] Que tú, que tú, que tú y yo
[01:41.00] Yo no te pienso fallar jamás
[01:46.00] Y siento que tú tampoco lo harás
[01:51.00] No puedo dejar de pensar en ti nada más`
  },
  {
    id: "te-quiero-tanto",
    title: "te quiero tanto",
    artist: "Kevin Kaarl",
    album: "Hasta el Fin del Mundo",
    cover: "assets/covers/te-quiero-tanto.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/36/8c/a5368c47-f752-aae7-d20a-1780df6edb5c/mzaf_8011801272974753606.plus.aac.p.m4a",
    youtubeId: "Z1zYWPBsNjw", // Versión con letra compatible
    comment: "(Te siento al cantar Y al esuchar cada cancion bonita que hable del amor de lo que siento ayer y hoy Siempre te llevo al despertar)",
    lyrics: `[00:00.00] (Instrumental)
[00:09.50] Nunca digas que te vas sin querer regresar
[00:15.00] Cuando de ti me enamoré
[00:18.50] Cuando cien años ya te amé
[00:22.00] Llévame siempre al recordar
[00:25.50] Viéndote bailar en aquel cerro Coronel
[00:31.00] Y ya mil veces te besé
[00:34.50] Y no lo niego, me clavé
[00:38.00] Llévame siempre al recordar
[00:41.00] Te he visto en frente, sonriente, valiente
[00:46.00] Te quiero tanto
[00:49.00] Vestido blanco, en el medio tu alma
[00:54.00] Te quiero tanto
[00:57.00] Me duele fuerte pensar que algún día
[01:02.00] Te encuentre ausente
[01:05.00] Me duele fuerte pensar que algún día
[01:10.00] Te encuentre ausente
[01:14.50] Te siento al cantar
[01:18.50] Y al escuchar cualquier canción
[01:22.00] Bonita que hable del amor
[01:26.50] De lo que siento ayer y hoy
[01:30.50] Siempre te llevo al despertar
[01:34.50] Te vi a los ojos bien
[01:38.50] Sentí cariño fiel
[01:42.50] Si me rompiera aquí
[01:46.50] Esperaría por ti
[01:50.00] Te he visto en frente, sonriente, valiente
[01:54.50] Te quiero tanto
[01:58.00] Vestido blanco, en el medio tu alma
[02:03.00] Te quiero tanto
[02:06.00] Me duele fuerte pensar que algún día
[02:11.00] Te encuentre ausente
[02:14.00] Me duele fuerte pensar que algún día
[02:19.00] Te encuentre ausente
[02:24.00] Te vi a los ojos bien
[02:28.00] Sentí cariño fiel
[02:32.00] Si me rompiera aquí
[02:36.00] Esperaría por ti`
  },
  {
    id: "por-ti-me-quedo-en-san-luis",
    title: "Por Ti Me Quedo en San Luis",
    artist: "Un León Marinero, Kevin Kaarl",
    album: "Por Ti Me Quedo en San Luis",
    cover: "assets/covers/por-ti-me-quedo-en-san-luis.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/1f/9c/b4/1f9cb47b-ca88-ffb1-7db4-d67d290a2e8f/mzaf_1042009488578399839.plus.aac.p.m4a",
    youtubeId: "J2a4GTmK7kU", // Versión con letra compatible
    comment: "(La verdad es que si duele saber que no es mi lugar Y porque aqui mi cielo es gris Quisiera poder decirte por ti me quedo en san luis)",
    lyrics: `[00:00.00] (Instrumental)
[00:07.00] Ya no queda nada más de mi pa' ti
[00:10.50] Pero lejos de odiarte
[00:13.00] Lo que quiero es salvar
[00:15.50] A la muchacha que algún día me hizo feliz
[00:21.00] Ya no pierdas más tu tiempo
[00:25.00] Ya di todo lo que tengo
[00:28.50] Y la verdad, la verdad
[00:31.50] La verdad es que sí duele saber que no es mi lugar
[00:37.00] Y porque aquí, mi cielo es gris
[00:41.50] Quisiera poder decirte "por ti me quedo en San Luis"
[00:47.50] Ya no hay más canciones que escribir
[00:51.50] La verdad ya ni lo intento
[00:55.00] Suena feo, pero es cierto
[00:58.00] Que comienzo a olvidar todo de ti
[01:03.00] Y me duele, no lo niego
[01:06.50] Voy de mal en peor, lo acepto
[01:09.50] Y la verdad, la verdad
[01:12.50] La verdad es que sí duele saber que no es mi lugar
[01:18.50] Y porque aquí, mi cielo es gris
[01:22.50] Quisiera poder decirte "por ti me quedo en San Luis"
[01:28.50] Quisiera poder decirte
[01:32.00] Que el cariño aún existe
[01:35.50] Será triste, pero se nos pasará
[01:41.00] Y aunque nunca te lo dije
[01:44.50] Agradezco lo que hiciste
[01:48.50] Y algún día el cielo te lo pagará
[01:53.50] Ah, ah
[01:57.50] Ah, ah
[02:00.50] Y algún día el cielo te lo pagará`
  },
  {
    id: "hasta-donde-te-quiero",
    title: "Hasta Donde Te Quiero",
    artist: "La Rondalla de Saltillo",
    album: "Hasta Donde Te Quiero",
    cover: "assets/covers/hasta-donde-te-quiero.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b6/d6/d2/b6d6d21e-739c-ea01-171e-bab1d14b2701/mzaf_8097543667161736848.plus.aac.p.m4a",
    youtubeId: "pbmbHdjcFbY", // Versión con letra compatible
    comment: "(No preguntes a mi alma cuanto te amo Porque para mi amor no hay distancias ni fronteras Y si quieres saber cuanto he de amarte Te amo mas alla de tu vida, de la mia, y del tiempo, Porque poca es la eternidad para adorarte)",
    lyrics: `[00:00.00] (Instrumental)
[00:05.50] ¿Que hasta dónde te quiero?
[00:10.00] Siempre me has preguntado
[00:14.00] No te sé decir
[00:17.00] Si parece imposible
[00:21.00] Alcanzar una estrella
[00:25.00] Yo lo haría por ti
[00:28.50] ¿Que hasta dónde te quiero?
[00:33.00] Esa necia pregunta
[00:36.50] No responderé
[00:39.50] Si en mi amor no hay distancias
[00:44.00] Si no hay cerca, no hay lejos
[00:47.50] ¿Cómo te haré saber?
[00:51.50] Júzgame como un loco
[00:55.00] Piensa tú lo que quieras
[00:58.50] Yo te quiero así
[01:01.50] ¿Quieres que yo te diga?
[01:05.00] ¿Hasta dónde te quiero?
[01:08.00] Hasta donde tus ojos no ven
[01:13.50] No preguntes a mi alma cuánto te amo
[01:20.50] Porque para mi amor no hay distancias ni fronteras
[01:27.00] Y si quieres saber cuánto he de amarte
[01:33.00] Te amo más allá de tu vida, de la mía y del tiempo
[01:39.50] Porque poca es la eternidad para adorarte
[01:45.50] Si tú quieres, soy loco
[01:49.50] Píntame como quieras
[01:52.50] Siempre esclavo de ti seré
[01:56.50] ¿Quieres que yo te diga?
[01:59.50] ¿Hasta dónde te quiero?
[02:02.50] Hasta donde tus ojos no ven
[02:07.50] Hasta donde tus ojos no ven
[02:13.00] Hasta donde tus ojos no ven`
  },
  {
    id: "la-distancia",
    title: "La Distancia",
    artist: "Manuel Medrano",
    album: "Manuel Medrano",
    cover: "assets/covers/la-distancia.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/23/09/18/23091892-5866-5728-1824-4865a6b790fd/mzaf_8514783037452465205.plus.aac.p.m4a",
    youtubeId: "OTrZCDTBoaE", // Versión con letra compatible
    comment: "(Hoy me acuerdo de tus besos aun que ya no estes aqui Y de lo mucho que he querido volver a tocarte niña no te olvides mi)",
    lyrics: `[00:00.00] (Instrumental)
[00:14.00] No me acordaba de lo rico que era tocar tu piel
[00:20.00] De lo bien que se sentía, abrazarte
[00:25.50] Todo lo que me decías al mirarme
[00:30.00] Y cómo tus manos
[00:32.50] Sacudían todos esos problemas de mí
[00:37.00] Y me hacían olvidar lo cruel que era el mundo
[00:41.50] Hoy me acuerdo de tus besos aunque ya no estés aquí
[00:48.00] Y de lo mucho que he querido
[00:51.00] Volver a tocarte, niña
[00:54.00] No te olvides de mí
[00:56.50] Ojalá que nunca se te olvide
[01:01.00] A dónde quedamos de encontrarnos
[01:05.00] Allá en el futuro
[01:07.50] Donde nadie conoce allá
[01:11.50] En la distancia que podrá curar
[01:16.00] Todo lo que nos hicimos ayer
[01:19.50] Porque algún día te miraré a los ojos
[01:24.00] Y sabremos que a pesar de todo
[01:28.00] Es como si entre nosotros
[01:32.00] Nada fuera a terminar
[01:48.50] Ojalá que nunca se te olvide
[01:52.50] A dónde quedamos de encontrarnos
[01:56.50] Allá en el futuro
[01:59.50] Donde nadie conoce allá
[02:03.50] En la distancia que podrá curar
[02:07.50] Todo lo que nos hicimos ayer
[02:11.50] Porque algún día te miraré a los ojos
[02:16.00] Y sabremos que a pesar de la distancia
[02:20.00] Es como si entre nosotros
[02:24.00] Nada fuera a terminar`
  },
  {
    id: "reloj-ingrato",
    title: "Reloj Ingrato (Acústica)",
    artist: "José y el Toro",
    album: "Reloj Ingrato",
    cover: "assets/covers/reloj-ingrato.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ee/c3/c3/eec3c353-d63f-1c9a-d69f-e936491dad7d/mzaf_8372333272221499013.plus.aac.p.m4a",
    youtubeId: "70f31yGzXxY", // Versión con letra compatible
    comment: "(Contigo hasta la eternidad se siente como un instante Cuando estamos juntos el tiempo es injusto Las horas son minutos los minutos segundos Pero si te alejas corazon el tiempo se congela)",
    lyrics: `[00:00.00] (Instrumental)
[00:09.00] ¿A dónde fuiste, corazón?
[00:12.50] Te tardaste una vida
[00:16.00] Parece una eternidad
[00:19.00] Cuando compras en la esquina
[00:22.50] Si no estamos cerca
[00:25.50] El tiempo quema
[00:28.50] Las horas son largas
[00:31.00] Frías y eternas
[00:34.00] Pero si estás cerca, corazón
[00:38.00] El tiempo vuela
[00:41.50] Reloj, hagamos un trato
[00:45.50] Y congélate el rato
[00:49.00] Que me veas junto a ella
[00:53.00] Y si ves
[00:55.00] Que de mí ella se aleja
[00:58.00] Hasta que vuelva
[01:00.50] Por favor, acelera
[01:13.00] ¿A dónde vas tan rápido?
[01:16.50] Si hace nada que llegaste
[01:20.00] Contigo hasta la eternidad
[01:23.50] Se siente como un instante
[01:27.00] Cuando estamos juntos
[01:30.00] El tiempo es injusto
[01:33.00] Las horas son minutos
[01:35.50] Los minutos, segundos
[01:38.50] Pero si te alejas, corazón
[01:42.00] El tiempo se congela
[01:45.50] Reloj, hagamos un trato
[01:49.50] Y congélate el rato
[01:53.00] Que me veas junto a ella
[01:57.00] Y si ves
[01:59.00] Que de mí ella se aleja
[02:02.00] Hasta que vuelva
[02:04.50] Por favor, acelera`
  },
  {
    id: "amor-completo",
    title: "Amor Completo",
    artist: "Mon Laferte",
    album: "Mon Laferte Vol. 1",
    cover: "assets/covers/amor-completo.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/2a/30/a52a30c4-1b05-102b-3914-f518a2d08924/mzaf_4992086678498344351.plus.aac.p.m4a",
    youtubeId: "bLojUhnV_RQ", // Versión con letra compatible
    comment: "(Arrullame Ahogame Aplastame Desarmame Comeme y Fumame Amor inquierto Amor drogado Amor completo)",
    lyrics: `[00:00.00] (Instrumental)
[00:11.00] Arrullo de estrellas, te quiero contar
[00:16.50] Que mi vida entera te quiero entregar
[00:22.00] Eres mi sol, mi luna y mi mar
[00:28.00] Mi amor completo, mi otra mitad
[00:34.00] Siento tus manos temblar junto a mí
[00:39.50] Y en tus ojos veo el mundo sonreír
[00:45.00] No hay nada más bello que estar junto a ti
[00:51.00] Amor de mi vida, me haces feliz
[00:57.50] Y es que te amo tanto, mi amor, mi bien
[01:03.00] Que no sé cómo expresar lo que siento también
[01:09.00] Contigo los días son de oro y miel
[01:14.50] Amor de mi alma, mi dulce clavel
[01:20.50] Mirando la luna te vuelvo a decir
[01:26.00] Que nací en este mundo para ti hacer feliz
[01:31.50] Que no hay otra senda que quiera seguir
[01:37.00] Si no es de tu mano, mi amor, hasta el fin`
  },
  {
    id: "morfeo",
    title: "MORFEO",
    artist: "WOS",
    album: "Descartable",
    cover: "assets/covers/morfeo.png",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/a3/49/3a/a3493a05-3a00-654b-3a22-0de6fde4d6b2/mzaf_17841733108565847051.plus.aac.p.m4a",
    youtubeId: "REGykwPCTUw", // Versión con letra compatible
    comment: "(Ya entendi porque gusto de lo calido Es que pensar en vos es como acercarse al fuego Ese que hizo cenizas del oraculo Incinerando destinios para escribirlos de nuevo)",
    lyrics: `[00:00.00] (Instrumental)
[00:09.00] Parece tan azaroso aquello que nos salva
[00:14.00] Se vuelve tan valioso el beso de la calma
[00:19.00] El peso de las almas y su abrazo ansioso
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
[01:56.00] Convivo con el vacío y lo convido
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
    youtubeId: "8irqXPFv8ms", // Versión con letra compatible
    comment: "(No es secreto, tú me tiene' loco Me siento en LSD cuando te toco Soy un tonto y mil vece' me equivoco Te quiero siempre a mi ladito como Yōko)",
    lyrics: `[00:00.00] (Instrumental)
[00:08.50] No es secreto, tú me tiene' loco
[00:12.50] Me siento en LSD cuando te toco
[00:16.50] Soy un tonto y mil vece' me equivoco
[00:20.50] Te quiero siempre a mi ladito como Yōko
[00:25.00] Oh, no te vaya' nunca
[00:28.50] Oh, no te vaya' nunca
[00:32.50] Oh, no te vaya' nunca
[00:36.00] Oh, no te vaya' nunca
[00:40.00] Ey, ah
[00:42.00] Prefiero tus labio' a cualquier premio
[00:45.50] Prefiero tu boca que un número uno
[00:49.00] ¿Cómo llegué a ser tu rey? Eso e' un misterio
[00:53.00] Un atardecer contigo no lo cambio por ninguno
[00:57.50] Si tú me quisiste cuando ni yo me quería
[01:01.00] Que tú me quisiste cuando ni yo me quería, eh
[01:05.00] Yo tan T'Chala, tú tan princesa Diana
[01:09.00] En la cama Lana Rhoades, en la calle siempre panas
[01:13.00] Soñé que estaba contigo en la portada
[01:17.00] De Vogue, los dos vestido' 'e Prada
[01:20.50] Que nos grabábamo' en el sofá Eames de la sala
[01:24.50] Y lo enseñaba en Sunset y Cannes to' el mundo lo amaba (Oh)
[01:28.50] Este es el amor del cual mi abuelito me hablaba (Ah)
[01:32.50] Querer estar a tu la'o hasta que el pelo esté lleno de cana' (Ah)
[01:37.00] Yo quiero, quiero, quiero, quiero verte brillar por siempre
[01:41.00] Yo quiero, quiero, quiero, quiero verte bailar por siempre, yeah
[01:46.00] Tú y yo por siempre
[01:49.50] Baby, tú y yo por siempre`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = songsData;
}
