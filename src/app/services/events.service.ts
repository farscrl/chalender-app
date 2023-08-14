import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Event} from "../data/event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private basePath = 'events';

    private events = [
        {
            "ID": 0,
            "Titel": "Singen mit Flurin",
            "Gener": "concert,musica",
            "Descripziun": "„Singen mit Flurin“ –  wunderbare, ungezwungene Abende im Marsöl in Chur. Das Publikum ist der Chor. Und wenn jemand den Ton nicht ganz genau trifft, kein Problem.\n\n„Singen mit Flurin“ – eine Erfolgsgeschichte auf allen Ebenen. Wunderbare, ungezwungene und entspannte Abende im Marsöl und rundum glückliche Gesichter. Das Ziel von Caviezel, die Gesellschaft wieder zusammenzubringen, wurde erreicht.  Und da der Wunsch nach einer Fortsetzung dieses gemeinsamen Singens immer lauter wurde, geht es im 2023 weiter. An vier Mittwoch-Abenden im Frühling, Sommer, Herbst und Winter wird wieder zusammen gesungen und auch gelacht.\nSingen entspannt, singen macht glücklich und wenn man singt, wird das Kuschelhormon Oxytocin ausgeschüttet. Für einmal sieht und hört man den Bündner Kabarettisten und Musiker Flurin Caviezel nicht nur, nein das Publikum macht mit, alle singen mit  ihm zusammen. Der Text wird auf der Kinoleinwand projiziert und schon geht es los. Gemeinsam statt einsam. Und wenn jemand den Ton nicht ganz genau trifft, kein Problem, diejenigen links und rechts werden das übertönen.\nGanz bewusst wird der Gesang nur durch ein Klavier unterstützt. Das bringt zum einen den Vorteil, dass Tempo und Tonart sofort, direkt und unkompliziert angepasst werden können und zum andern, dass dem Gesang mehr Raum, mehr Klang gegeben wird.\n\nAn einem Abend werden jeweils drei Sets a  circa 30 Minuten gesungen. Die Lieder der einzelnen Sets haben ein gemeinsames Motto. Das kann zum Beispiel eine Jahreszeit, eine besondere Kategorie wie Liebeslieder, oder Lieder einer bestimmten Musikgruppe wie z.B. Abba oder Beatles sein. Neben verschiedenen Sprachen haben auch Lieder in unseren Kantonssprachen, Walserdeutsch, Rätoromanisch und Italienisch ihren festen Platz im Repertoire. Wir singen Hits, Evergreens, Volkslieder, von «Sch’eu füss ‘na randulina» bis «I’m sailing», von «Azzuro» bis «Über den Wolken», «Champs Elysees» bis «Hemmige» und noch vieles mehr und alle werden einen glücklichen Abend erleben. Also: «Let it be»!",
            "Lieu": "Restaurant Marsöl, Chur",
            "Adressa": "Restaurant Marsöl, Süsswinkelgasse 25, 7000 Chur",
            "Cumenzament": "05.04.2023, 19:30",
            "Cumenzament_temp": "19:30",
            "Fin": "05.04.2023, 21:30",
            "Durada": "02:00",
            "Temp_alt": "19:30",
            "Durada_alt": "02:45",
            "Regiun": "Cuira",
            "Lingua": "tudestg | rumantsch | talian",
            "Contact": "ArteCultura, info@artecultura.ch",
            "Organisatura": "ArteCultura",
            "Maletg": "https://ik.imagekit.io/guidle/tr:h-250,c-at_least,dpr-2/1/93/5f/1935f217191e2469746dca9b756a9163265100e5_747711224.jpg",
            "URL": "flurincaviezel.ch/",
            "Agiuntas": "",
            "Prevendita": "info@artecultura.ch \noder Tel. 076 375 825 55",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "https://www.chur-kultur.ch/de/agenda-extended/singen-mit-flurin-chur_ATKPZSk?"
        },
        {
            "ID": 1,
            "Titel": "festival da la poesia alpina contemporana",
            "Gener": "litteratura,art",
            "Descripziun": "Dus dis da litteratura, cun 15 auturas ed auturs da la Ladinia, dal Grischun e dal Friul che vegnan a preleger lur texts, presentads e commentads da trais critics letterars. Plinavant vegn il festival accumpagnà da chantauturas e chantauturs da las trais regiuns linguisticas partecipadas. Ina occasiun d’inscunter e da cumparaziun preziusa per approfundar l’enconuschientscha da la realitad linguistic-litterara da questas trais inslas linguisticas alpinas. Nus ans legrain da vossa visita!",
            "Lieu": "Biblioteca municipala, Persenon-Brixen",
            "Adressa": "Biblioteca municipala, Piazza del Duomo 4, 39042 Bressanone BZ, Italien",
            "Cumenzament": "12.05.2023",
            "Cumenzament_temp": "entir di",
            "Fin": "",
            "Durada": "entir di",
            "Temp_alt": "entir di",
            "Durada_alt": "1 di",
            "Regiun": "Tirol dal Sid",
            "Lingua": "rumantsch | tudestg",
            "Contact": "Annetta Ganzoni, Büro per Litteratura, annettaganzoni@bluewin.ch",
            "Organisatura": "Büro per Litteratura",
            "Maletg": "http://www.saav.it/uploads/news/files/217/detail_Poster1024_1.jpg",
            "URL": "",
            "Agiuntas": "https://drive.google.com/drive/folders/1BoaVchmeQDNthU3SaXMV2EYZv96gv9kq?usp=share_link",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "LIVE STREAMING: microfilmdigital.it/live",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 2,
            "Titel": "Guida publica tras l’exposiziun ‘Retrospectiva Gieri Schmed’",
            "Gener": "art",
            "Descripziun": "La retrospectiva a caschun digl 80avel natalezi che Gieri Schmed havess festivau uonn muossa ovras digl artist dall’entschatta entochen alla fin da siu temps creativ, da 1962 entochen 2019. Ei setracta d’ina premiera, nua che plirs maletgs meins- e nunenconuschents vegnan presentai alla publicitad. In omagi en regurdientscha dad ina veta dedicada agl art.",
            "Lieu": "Museum sursilvan Cuort Ligia Grischa, Trun",
            "Adressa": "Museum Sursilvan, Cuort Ligia Grischa, Via Principala 90, CH-7166 Trun",
            "Cumenzament": "23.04.2023, 14:15",
            "Cumenzament_temp": "14:15",
            "Fin": "23.04.2023, 15:15",
            "Durada": "01:00",
            "Temp_alt": "14:15",
            "Durada_alt": "",
            "Regiun": "Surselva",
            "Lingua": "rumantsch | tudestg",
            "Contact": "081 943 25 83",
            "Organisatura": "Museum Sursilvan Cuort Ligia Grischa, Trun",
            "Maletg": "https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/339272167_1329016677956616_2965524773182781352_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=TEw8JfXHDv0AX9nfC6g&_nc_ht=scontent-zrh1-1.xx&oh=00_AfCp3B4EQyEzL5gbctqt4xy2mRDlp6Lllv79nspe3EyroA&oe=645AAF64",
            "URL": "museum-trun.ch",
            "Agiuntas": "https://drive.google.com/drive/folders/1ZsfeSPWKlQC88Q8tQOCDfwVbj9RcXjMs?usp=share_link",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 6,
            "Titel": "Lavuratori Traversadas litteraras 2023",
            "Gener": "curs",
            "Descripziun": "Il lavuratori è avert per tut las persunas interessadas cun experientscha da scriver e/u da translatar.\nLa publicaziun dal lavuratori Traversadas litteraras dals 20 d’october 2023 suonda la fin d’avust",
            "Lieu": "Lia Rumantscha, Cuira",
            "Adressa": "Lia Rumantscha, Via da la Plessur 47, 7001 Cuira",
            "Cumenzament": "20.10.2023, 10:00",
            "Cumenzament_temp": "10:00",
            "Fin": "20.10.2023, 17:00",
            "Durada": "07:00",
            "Temp_alt": "10:00",
            "Durada_alt": "10:00–17:00",
            "Regiun": "regiun Cuira",
            "Lingua": "rumantsch",
            "Contact": "info@rumantsch.ch",
            "Organisatura": "Chasa da la translaziun Looren e la Lia Rumantscha",
            "Maletg": "https://sjw.ch/media/e8/e5/c6/1675937311/Traversadas-1%20%281%29.jpg",
            "URL": "www.liarumantscha.ch",
            "Agiuntas": "",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 8,
            "Titel": "Grischun conta",
            "Gener": "chor",
            "Descripziun": "Sut il motto “Grischun conta” ha l’uniun Cultura Rumantscha en la Bassa gudignau il chor viriil Ligia Grischa, cantus firmus surselva ed il Chor da giuvenil*as grischun per in concert unic. Tuts treis chors presentan canzuns primarmein romontschas e contemporanas.",
            "Lieu": "Baselgia catolica a Cham",
            "Adressa": "Baselgia catolica, Kirchbühl 10, 6330 Cham",
            "Cumenzament": "22.04.2023, 19:30",
            "Cumenzament_temp": "19:30",
            "Fin": "22.04.2023, 22:00",
            "Durada": "02:30",
            "Temp_alt": "19:30",
            "Durada_alt": "",
            "Regiun": "Bassa",
            "Lingua": "rumantsch",
            "Contact": "remopfister@gmx.net",
            "Organisatura": "Uniun Cultura Rumantscha en la Bassa",
            "Maletg": "https://eventfrog.ch/upload/rm/ca/nt/cantusfirmus-flyer-a5quer-konzert-grischun-conta-v-1.png",
            "URL": "",
            "Agiuntas": "https://drive.google.com/drive/folders/1KzMydkk0VFRp0MULYVakhH2L84pfoCzC?usp=share_link",
            "Prevendita": "https://www.ticketcorner.ch/artist/3-romanische-spitzenchoere/?affiliate=TCS u cassa avant il concert",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 10,
            "Titel": "prelecziun da Gian Gaudenz",
            "Gener": "litteratura",
            "Descripziun": "19:15 h radunanza generala\n20:15 h prelecziun / Vorlesung da Gian Gaudenz our da seis cudesch / aus seinem Buch “Bündnerspeck”.\n\nEntrada libra, collecta\nReservaziun facultativ, tel. 081 864 08 89 / 076 343 63 51\nSco finischun da l’occurrenza offrischa la società ün aperitiv.",
            "Lieu": "Baselgia San Niclà, Strada",
            "Adressa": "Baselgia San Niclà, Strada",
            "Cumenzament": "14.04.2023, 20:15",
            "Cumenzament_temp": "20:15",
            "Fin": "14.04.2023, 21:30",
            "Durada": "01:15",
            "Temp_alt": "20:15",
            "Durada_alt": "",
            "Regiun": "Engiadina Bassa",
            "Lingua": "rumantsch",
            "Contact": "jachen.erni@outlook.com",
            "Organisatura": "Center cultural Baselgia San Niclà, Strada",
            "Maletg": "https://www.engadinerpost.ch/media/cache/large/uploads/media/post/25116/R-Baselgia-San-Nicla-Gianin-Gaudenz-2023-bcs-644004cda65b0.jpg",
            "URL": "www.san-nicla.ch",
            "Agiuntas": "",
            "Prevendita": "Entrada libra, collecta\n\nReservaziun facultativ, tel. 081 864 08 89 / 076 343 63 51",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 11,
            "Titel": "Retrospectiva\nGieri Schmed",
            "Gener": "art",
            "Descripziun": "La retrospectiva a caschun digl 80avel natalezi che Gieri Schmed havess festivau uonn muossa ovras digl artist dall’entschatta entochen alla fin da siu temps creativ, da 1962 entochen 2019.\n\nEi setracta d’ina premiera, alla quala era maletgs meins- e nunenconuschents vegnan presentai alla publicitad. \nIn omagi en regurdientscha ad ina veta dedicada agl art.\n\nLa contribuziun da RTR da tedlar sin quei link.\n\t\nGieri Schmed ei naschius ils 3 da schaner 1943 a Trun ed ha passentau si’affonza a Cartatscha, in uclaun da Trun. Cun 15 onns eis el serendius a Tavau per far siu emprendissadi da pictur. Tavau enconuscheva Gieri gia pulit bein cunquei ch’el fageva\nleu savens visetas a sia tatta. A Tavau ha el era empriu d’enconuscher meglier igl artist Alois Carigiet, ha luvrau per lez sco gidonter e survegniu da lez grond sustegn per sefatschentar adina pli intensivamein cun l’atgna forza artistica ella pictura.\n1970 ha el fatg sias empremas lavurs artisticas.\nSecasaus puspei a Trun/Gravas cun sia consorta Barla Maria Schmed-Albin e ses dus fegls Rafael e Marcus, ha Gieri Schmed fundau l’atgna fatschenta da pictur.\nTonaton ha el impundiu vinavon aschi bia temps sco pusseivel per igl art.\n1988 ha el survegniu il premi da promoziun dil Cantun Grischun ed igl onn 1993 ei il cudisch Konstellationen vegnius publicaus. En var 57 exposiziuns ha igl artist da Trun presentau sias ovras alla publicitad.\n1997 ei Gieri Schmed vegnius recepius ella GSMBA, oz num-\nnada Visarte.\nEnsemen cun sia consorta Barla ha el astgau passentar in bi e productiv temps a Paris 1999 ella Cité Internationale des Arts Paris ed ella Belgia 2007 el Center Frans Masereel Kasterlee.\nUonn havess igl artist festivau siu 80avel anniversari.",
            "Lieu": "Museum Sursilvan Cuort Ligia Grischa, Trun",
            "Adressa": "Museum Sursilvan, Cuort Ligia Grischa, Via Principala 90, CH-7166 Trun",
            "Cumenzament": "08.04.2023, 10:00",
            "Cumenzament_temp": "10:00",
            "Fin": "30.10.2023, 17:00",
            "Durada": "",
            "Temp_alt": "14:00 - 17:00",
            "Durada_alt": "8.4.2023 - 30.10.2023 gliendisdis, mesjamna, sonda, la 2. e 4. dumengia dil meins",
            "Regiun": "Surselva",
            "Lingua": "rumantsch | tudestg",
            "Contact": "museum@trun.ch",
            "Organisatura": "Museum Sursilvan Cuort Ligia Grischa",
            "Maletg": "https://www.graubuenden.ch/sites/all/files/styles/hero_detailpage_small_2x/shared/discover.swiss/images/img_wt1_hfbajgabb.jpg?h=08b866d1",
            "URL": "museum-trun.ch",
            "Agiuntas": "https://drive.google.com/drive/folders/11nxXsPCxDjfiyDH_e6aTiPXpZl3EmKau?usp=share_link",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": "Posta rumantscha"
        },
        {
            "ID": 12,
            "Titel": "Hasi Farinelli",
            "Gener": "Teater",
            "Descripziun": "La historia basescha sin ina fabla da Aesop. Ils dus protagonists, Hasi e Farinelli, secreian omisdus ch’els seigien ils megliers che lur antagonist, e muossan tgei ch‘els san en ina concurrenza tut speciala, mo per anflar ora ch’els ein megliers ensemen. \n\nEi tunan arias e duets bein enconuschents da baroc tochen la romantica e denteren cumposiziuns da Quirina Lechmann.",
            "Lieu": "Postremise, Cuira",
            "Adressa": "Postremise, Engadinstrasse 43, 7000 Chur",
            "Cumenzament": "10.04.2023, 20:00",
            "Cumenzament_temp": "20:00",
            "Fin": "10.04.2023, 22:00",
            "Durada": "02:00",
            "Temp_alt": "16:30",
            "Durada_alt": "01:00",
            "Regiun": "regiun Cuira",
            "Lingua": "rumantsch",
            "Contact": "l_quirina@hotmail.com",
            "Organisatura": "Quirina Lechmann\nColoratura Soprano & Performance Artist\nwww.quirinalechmann.com",
            "Maletg": "https://cdn-az.allevents.in/events5/banners/4ea7d6e52b718fd6d6b58c6703a69d9edfbe092d77087526d96b9e538dcb21ef-rimg-w960-h950-gmir.jpg?v=1681120605",
            "URL": "https://www.postremise.ch/events/hasi-farinelli-2/form",
            "Agiuntas": "https://drive.google.com/drive/folders/1Zb4qXISN2oO6yC4ggy68y6oM8kvRuGtc?usp=share_link",
            "Prevendita": "Entrada: 30.- / Reducziun: 20.-",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 13,
            "Titel": "surdada dal premi grischun da litteratura a Joachim B. Schmidt",
            "Gener": "Litteratura",
            "Descripziun": "Invit a la surdada dal Premi grischun da litteratura 2023\nJoachim B. Schmidt, «Tell», Diogenes Verlag, Zürich 2022",
            "Lieu": "Alter Konsum, Cazis",
            "Adressa": "Alter Konsum, Bahnhofstasse 8, 7408 Cazis",
            "Cumenzament": "14.04.2023, 18:30",
            "Cumenzament_temp": "18:30",
            "Fin": "14.04.2023, 20:00",
            "Durada": "01:30",
            "Temp_alt": "18:30",
            "Durada_alt": "",
            "Regiun": "Grischun Central",
            "Lingua": "rumantsch",
            "Contact": "rico@valaer.ch",
            "Organisatura": "Rico Valaer",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/Premi-grischun-da-litteratura-2023-1.jpg",
            "URL": "",
            "Agiuntas": "https://drive.google.com/file/d/1sO7Pdq4qR_HMyfxoAfTwIoTfzRuGJit1/view?usp=sharing",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 14,
            "Titel": "Rumantsch è …",
            "Gener": "Exposiziun",
            "Descripziun": "Co vesan atgnamain or ils ierts en la Rumantschia?\n\nLa resposta: fitg multifars. En Surselva creschan per exempel ils urteis, en la Tumleastga il mangieult ed en l'Engiadina Bassa las piessas. Betg da smirvegliar che er ils capuns na vegnan betg fatgs dapertut tuttina. Quai mussa ch'il rumantsch procura cun ses tschintg idioms per varietad – betg mo en iert ed en cuschina, mabain er en la cultura ed en la vita. L'exposiziun ambulanta «Rumantsch è…», ina iniziativa da l'anteriur cusseglier guvernativ Christian Rathgeb, dal chantun Grischun e da la Lia Rumantscha, vul sensibilisar per il rumantsch, gida a colliar ed envida las visitadras ed ils visitaders da «semnar lingua».\n\nUltra da quai chatt'ins en l'exposiziun: la sutga rumantscha, l'ura rumantscha e la charta geografica «Svizra Rumantscha». Donat Caduff ha translatà ils nums da tut las radund 2200 vischnancas en rumantsch. Per las bleras na devi fin ussa nagina denominaziun rumantscha.\n\nL’exposiziun ‘Rumantsch è …` vegn accumpagnada d’in vast program: curs da lingua, concert da Mattiu, saira rumantscha en il Museum Laax, guida cun ils artists cumpigliads Anna.R.Stoffel e Donat Caduff etc.\n\navertura sonda, 1.04.23, 13-17h\n14.00 introducziun Andreas Gabriel, Lia Rumantscha\n\ntemps d’avertura\n\n02.04. – 14.05.2023\ngievgia – dumengia\n13.30 – 16.30 h",
            "Lieu": "Cularta Laax",
            "Adressa": "Cularta, Via Falera 2a, 7031 Laax",
            "Cumenzament": "01.04.2023",
            "Cumenzament_temp": "inter di",
            "Fin": "14.05.2023",
            "Durada": "",
            "Temp_alt": "13:00",
            "Durada_alt": "01.04.2023 – 14.05.2023",
            "Regiun": "Surselva",
            "Lingua": "rumantsch | tudestg",
            "Contact": "info@cularta.ch",
            "Organisatura": "info@cularta.ch",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/cularta.jpg",
            "URL": "cularta.ch",
            "Agiuntas": "https://drive.google.com/file/d/1s4esM9qXAnPwhCiLaxNfnYTuYy-XrcIA/view?usp=sharing",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 15,
            "Titel": "Pina Palau",
            "Gener": "Concert",
            "Descripziun": "infos: www.cinemasilplaz.ch",
            "Lieu": "Cinema Sil Plaz",
            "Adressa": "Cinema Sil Plaz, Via Centrala 2, 7130 Ilanz/Glion",
            "Cumenzament": "01.04.2023, 20:30",
            "Cumenzament_temp": "20:30",
            "Fin": "01.04.2023, 22:00",
            "Durada": "01:30",
            "Temp_alt": "20:30",
            "Durada_alt": "",
            "Regiun": "Surselva",
            "Lingua": "tudestg",
            "Contact": "mariuschla@bluewin.ch",
            "Organisatura": "Cinema Sil Plaz",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/pina-palau.png",
            "URL": "https://pinapalau.bandcamp.com/track/closer",
            "Agiuntas": "",
            "Prevendita": "Entrada: 25.- / scolar*as e student*as 15.-",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 16,
            "Titel": "Prelecziun Jachen Andry",
            "Gener": "Litteratura",
            "Descripziun": "La prelecziun ha lieu in rumantsch cun translaziuns en talian e tudestg.",
            "Lieu": "Bücher Lüthy Cuira",
            "Adressa": "Bahnhofstrasse 8, 7000 Cuira",
            "Cumenzament": "30.03.2023, 19:30",
            "Cumenzament_temp": "19:30",
            "Fin": "30.03.2023, 21:00",
            "Durada": "01:30",
            "Temp_alt": "19:30",
            "Durada_alt": "",
            "Regiun": "regiun Cuira",
            "Lingua": "rumantsch | tudestg | talian",
            "Contact": "chur@buchhaus.ch",
            "Organisatura": "Bücher Lüthy",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/Prelecziun-Jachen-Andry.jpg",
            "URL": "",
            "Agiuntas": "https://drive.google.com/file/d/1GkIbfa_jCN9cWIkw8jxE0NE_5KDOGSf1/view?usp=sharing",
            "Prevendita": "Porta averta a partir da las 19:15",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 17,
            "Titel": "Poetry Slam Engiadinais",
            "Gener": "Litteratura",
            "Descripziun": "Poetry Slam Engiadinais\n\nPoetry Slams sun occurrenzas, inua cha persunas prelegian lur texts ad ün publicum. Ils texts paun esser poesias, istorgias, que po dafatta ir in direcziun da „rap\"… que es listess, ma minchün ho be 6 minuts per sia performance.\n\nIl publicum decida chi chi guadagna e quella persuna survain tradiziunelmaing üna butiglia Whiskey, tar nus Engiadinais saro que però üna buna butiglia iva (sponsoriseda da Mia Iva). In generel sun Poetry Slams sairedas fich pachificas e divertaivlas chi promouvan in prüma lingia la cumpagnia vi da la bar ed in nos cas natürelmaing eir la lingua rumauntscha.\n\nQue nu do auncha üngüna scena da Poetry Slam rumauntscha e que vulainsa müder quist an.\n\nIl prüm Poetry Slam Engiadinais ho lö in sanda, ils 15 avrigl 2023 illa Grotta da Cultura a Sent. La bar es avierta a partir da las 19:30 ed a las 20:00 cumainza il slam!\n\nModeraziun: Romana Ganzoni\nSlammedras e slammeder: Hannah Flury, Nadja Hort, Selina Müller, Janic Maskos\n\nPer dumandas u tar interess per as parteciper: info(at)udg.ch",
            "Lieu": "Grotta da Cultura, Sent",
            "Adressa": "Grotta da Cultura, Schigliana 204, 7554 Sent",
            "Cumenzament": "15.04.2023, 20:00",
            "Cumenzament_temp": "20:00",
            "Fin": "15.04.2023, 22:00",
            "Durada": "02:00",
            "Temp_alt": "20:00",
            "Durada_alt": "",
            "Regiun": "Engiadina Bassa",
            "Lingua": "rumantsch",
            "Contact": "fadimari@bluemail.ch",
            "Organisatura": "Uniun dals Grischs",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/Poetry-Slam-SENT.jpg",
            "URL": "",
            "Agiuntas": "",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 18,
            "Titel": "ina messa per pasch",
            "Gener": "Chor",
            "Descripziun": "Nus tuts selegrein dad astgar presentar in concert monumental suenter quater onns abstinenza!\n\nIl Chor dalla Scola claustrala ei puspei sin via cun ina capo-ovra contemporana.\n\nEnsemen cun ils ensembles deCanto e PiCant ed in grond orchester essan nus varga 160 giuvenils che\n\ncontan la \"Messa per pasch\" da Sir Karl Jenkins.",
            "Lieu": "Baselgia S. Franciscus, Turitg/Wollishofen",
            "Adressa": "Baselgia S. Franciscus, Albisstrasse, 8038 Zürich",
            "Cumenzament": "25.03.2023, 19:30",
            "Cumenzament_temp": "19:30",
            "Fin": "25.03.2023, 22:00",
            "Durada": "02:30",
            "Temp_alt": "19:30",
            "Durada_alt": "",
            "Regiun": "regiun Turitg",
            "Lingua": "rumantsch",
            "Contact": "defuns@kns.ch",
            "Organisatura": "Ursin Defuns (organisatur), Clau Schrrer (dirigent) e Rita Caduff (secretariat)",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/ina%20messa%20per%20pasch.jpeg",
            "URL": "",
            "Agiuntas": "https://drive.google.com/file/d/1mnR860Xl_PL-uP7e0iSDy8XX1bAefIlb/view?usp=sharing",
            "Prevendita": "",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 19,
            "Titel": "Concert da Curdin Nicolai & band",
            "Gener": "Concert",
            "Descripziun": "16.00 chantar ensemen chanzuns rumantschas\n17.30 pizza per tuts\n18.30 star si legher e chantar\n19.00 concert cun Curdin Nicolay e band",
            "Lieu": "Holzlegi, Winterthur",
            "Adressa": "Holzlegi, Holzlegistrasse 40, 8408 Winterthur",
            "Cumenzament": "25.03.2023, 19:00",
            "Cumenzament_temp": "19:00",
            "Fin": "25.03.2023, 21:45",
            "Durada": "02:45",
            "Temp_alt": "19:00",
            "Durada_alt": "",
            "Regiun": "regiun Turitg",
            "Lingua": "rumantsch",
            "Contact": "ontact@allegrawinti.ch",
            "Organisatura": "Cultura Rumantscha Winterthur",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/Concert-da-Curdin-Nicolai-&-band.jpg",
            "URL": "www.allegrawinti.ch",
            "Agiuntas": "",
            "Prevendita": "annunzias fin ils 20-03-23 a contact@allegrawinti.ch",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        },
        {
            "ID": 20,
            "Titel": "Luvratori «fundar ina cooperativa»",
            "Gener": "Politica",
            "Descripziun": "Caras amitg*as dalla Cooperativa Encarden\n\nUssa daventi concret! Nus prendein a mauns la fundaziun dalla Cooperativa Encarden. Cheu anflas ti igl invit al luvratori «fundar ina cooperativa» ils 29 d’avrel a Sagogn. Vul ti habitar ella Casa Encarden ni promover il project cun tias cumpetenzas? Lu selegrein nus da tia annunzia. En cass che ti sas buca vegnir al luvratori, astgas ti bugen separticipar la proxima ga.\n \nL’evaluaziun dil luvratori dil vitg ei terminada ed il protocol fotografic culs resultats vegn publicaus proximamein sin nossa pagina d’internet. Leu anflas ti era in artechel dalla gasetta Wochenzeitung (WOZ) che tematisescha la dificila situaziun sil marcau da habitaziuns en vitgs turistics els cuolms. Igl artechel presenta il project Cooperativa Encarden sco ina propo sta per sligiaziuns pusseivlas. Ultra ei la pagina d’internet ussa era accessibla cumpletamein per romontsch.\n\nAl luvratori dil vitg ei ina gruppa da diversas persunas da Sagogn seconstituida. Quella vegn ad accumpignar e sustener il project cun lur savida locala.\n\nCordials salids",
            "Lieu": "Sagogn",
            "Adressa": "Cooperativa Encarden, Via Vitg dadens 55, 7152 Sagogn",
            "Cumenzament": "29.04.2023, 10:00",
            "Cumenzament_temp": "10:00",
            "Fin": "29.04.2023, 12:00",
            "Durada": "02:00",
            "Temp_alt": "10:00",
            "Durada_alt": "",
            "Regiun": "Surselva",
            "Lingua": "rumantsch | tudestg",
            "Contact": "flurinb@bluewin.ch",
            "Organisatura": "Famiglia Bundi",
            "Maletg": "http://www.davidbuehler.ch/chalenderbilder/encarden.png",
            "URL": "www.encarden.ch",
            "Agiuntas": "https://drive.google.com/file/d/1OZim-_haR1qELE19NDcxqOmOSHYECKB5/view?usp=sharing",
            "Prevendita": "Annunzias: cooperativa@encarden.ch",
            "Pretsch": "",
            "Auter": "",
            "Funtauna": ""
        }
    ];

    constructor(private httpClient: HttpClient,) {
    }

    public getEvents() {
        return of(this.events);
    }

    public getEvent(id: number) {
        return of(this.events.find(event => event.ID === Number(id)));
    }

    public createEvent(event: Event): Observable<Event> {
        const body: any = Object.assign({}, event);
        return this.httpClient.post<Event>(this.getUrl(), body);
    }

    getUrl(id?: number) {
        if (id) {
            return environment.apiBasePath.concat(this.basePath).concat('/' + id);
        }
        return environment.apiBasePath.concat(this.basePath);
    }
}
