create schema janis_db;
use janis_db;

CREATE TABLE users (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
user_name VARCHAR(200) ,
birthday DATE ,
email VARCHAR(350) ,
password VARCHAR (385) ,
avatar VARCHAR(435) ,
created_at DATE,
updated_at DATE
);


INSERT INTO users 
VALUES
(DEFAULT, "JuPerez", "1974-03-2", " =Juperez23@gmail.com", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u", "juana.jpg", DEFAULT, DEFAULT),
(DEFAULT, "PePerez", "1991-02-09", "Perezpepe@gmail.com", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u", "pedro.jpg", DEFAULT, DEFAULT),
(DEFAULT, "MaCreed", "1964-05-20", "Creed89@gmail.com", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u", "martina.jpg", DEFAULT, DEFAULT),
(DEFAULT, "JGomez", "1982-10-12", "Julian234g@gmail.com", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u", "juana.jpg", DEFAULT, DEFAULT),
(DEFAULT, "PatAlvarez" , "1976-04-12", "Patricio32@gmail.com.ar", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u","patricio.jpg", DEFAULT, DEFAULT ),
(DEFAULT, "VicenteRu", "1945-11-19", "Vicente-manzana@gmail.com", "$2a$10$sNYsvrzqbKNETXmsmVp9LuPSi6fqzqjCyBOutHcWdZoX9CVb4lY3u","vicente.jpg", DEFAULT, DEFAULT),
(DEFAULT, "Juliatinez", "2001-12-13", "Martinez-milanesa@gmail.com", "$2a$10$XAyVJO8j5Gac0KtWun6zXOcvh8/7GFj8rFJGYrGR2DCfLFk8GFeb.","julian.jpg", DEFAULT, DEFAULT);


-------------------------------------------------------------------------

CREATE TABLE products (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
user_id INT UNSIGNED ,
electro_name VARCHAR(200) ,
electro_description TEXT ,
electro_image VARCHAR(435) ,
electro_comments INT,
created_at DATE,
updated_at DATE,

FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO products
VALUES
(DEFAULT, 1, "Heladera Samsung", "Heladera Side by Side año 2021.Almacená todos tus alimentos con un espacio de 716 litros netos*. Su exclusiva tecnología SpaceMax ™ permite que las paredes sean mucho más delgadas ya que utiliza una cantidad mínima de aislamiento de alta eficiencia. Por lo tanto, crea más espacio de almacenamiento sin aumentar las dimensiones externas ni comprometer la eficiencia energética.", "heladera.png",2, DEFAULT, DEFAULT),
(DEFAULT, 2, "Horno Bosch", "Doble Horno Electrolux (76DXR), año 2011. Es Moderna y segura, la Cocina Doble Horno Electrolux (76DXR) cuenta con dos hornos independientes a gas y un grill eléctrico para que puedas gratinar y dorar preparaciones y darle un toque especial a tus alimentos en el tiempo justo, gracias a su temporizador digital y reloj que facilita el control del tiempo de cocción. Sus dos hornos con temperatura independiente, permiten cocinar diferentes planos al mismo tiempo, sin mezclar aromas ni sabores. Cuenta también con cinco hornallas, una de ellas con función triple llama, que proporciona mayor rapidez en la cocción. Además, sus hornallas están selladas, de manera que no permiten la entrada de residuos al interior de la cocina. También el Recubrimiento FastClean evita la acumulación de grasa y facilita la limpieza del horno.", "horno.png",0, DEFAULT, DEFAULT),
(DEFAULT, 3, "Pava electrica", "Pava electrica digita, año 2019 .La jarra eléctrica digital Peabody PE-DKE655IX posee cuerpo integral y base de acero inoxidable con 1,7 lts de capacidad - Función Keep Warm programable por hasta 2 horas ( No se desprograma al levantarla) - Panel de control digital con 4 temperaturas preseleccionadas: 70°C, 80°C, 90°C , 100°C - Base con rotación de 360° y espacio guarda cable - Apertura de tapa por botón de doble efecto - Termostato Strix - Medidor transparente y microfiltro.", "pavaElectrica.png",3, DEFAULT, DEFAULT),
(DEFAULT, 4, "Cafetera Dolca", "Cafetera de 12 posillos, año 2020 .Capacidad 12 pocillos·Visor indicador del nivel de agua· Filtro permanente removible y lavable· Permite uso de filtro de papel· Sistema anti goteo· Mantiene el café con su aroma a la temperatura ideal· Potencia 800W", "cafetera.png",4, DEFAULT, DEFAULT),
(DEFAULT, 5, "Microondas Siemens", "Microondas con Grill, año 2018.Capacidad: 23 Litros, Potencia Microondas: 800 W, Grill: 1000 w, 5 Niveles de potencia, 8 Menues programables, Descongelado Automático, Bandeja giratoria, Traba de seguridad para niños, Reloj, Timer", "microondas.png",2, DEFAULT, DEFAULT),
(DEFAULT, 6, "Aspiradora Dyson", "Aspiradora Plateada Y Gris 220v, año 2010. Tus días de limpieza serán más simples con esta aspiradora Philco. Vas a poder deshacerte del polvo y de los residuos con rapidez y así dejar tus ambientes impecables. Más que solo aspirar. Su triple función te permitirá dejar relucientes tus pisos, alfombras y tapicerías sin esfuerzo. En cuanto a las tareas de jardinería vas a poder soplar hojas, arena y residuos.", "aspiradora.png",6, DEFAULT, DEFAULT),
(DEFAULT, 7, "Batidora Bosch", "Batidora OSTER SM3711,año2019. Preparar exquisitos pasteles, panes y mucho más es muy fácil y conveniente con la Batidora planetaria Oster®, esencial para cuando buscas facilidad sin sacrificar calidad. Sus 12 velocidades te dan más opciones para preparar tus recetas favoritas. Batidora planetaria con 12 velocidades 750 watts de potencia. Tazón de acero inoxidable con capacidad para 4 litros. Incluye 3 batidoras para mezclar, amasar y batir. Cubierta “Perfect Cover”", "batidora.png",1, DEFAULT, DEFAULT),
(DEFAULT, 3, "Plancha Remington", "Plancha ATMA C/VAPOR PAV1217E, año 2022. Súper Vapor. Potencia: 1800w. Suela Cerámica. Planchado Vertical. Tanque de 300ml de Capacidad.", "plancha.png",4, DEFAULT, DEFAULT),
(DEFAULT, 6, "Balanza Toledo", "Balanza De Cocina Gadnic G11 1gr a 5Kg Digital, año 2017. Es Versatil báscula para cocina u otros usos, fácil manejo; podrás pesar objetos tan ligeros desde 1 gramo hasta 5 kilogramos.", "balanza.png",3, DEFAULT, DEFAULT),
(DEFAULT, 7, "Tostadora Top House", "Tostadora Eléctrica Atma To8020i 700w 7 Niveles, año 2021. Tiene Bandeja De Migas. CARACTERISTICAS: Capacidad para 2 rebanadas, Potencia 700w, Cuerpo de acero inoxidable, Función calentar, descongelar y cancelar, Bandeja recolectora de migas, Base antideslizante, Enrolla cable, Luz roja indicadora, Medidas: 17,8 x 28,8 x 15,8 (Alto x Largo x Prof en Cms), Peso: 1,2 (Kgs)", "tostadora.png",9, DEFAULT, DEFAULT);


------------------------------------------------

CREATE TABLE comments(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
product_id INT UNSIGNED ,
user_id INT UNSIGNED ,
texto_comentario VARCHAR(400) ,
created_at DATE,
updated_at DATE,

FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO comments
VALUES
(DEFAULT, 1, 2, "Muy recomendado", DEFAULT, DEFAULT ),
(DEFAULT, 4, 4, "Muy buen elctrodomestico, ademas es de bajo consumo", DEFAULT, DEFAULT),
(DEFAULT, 3, 3 ,"Yo lo use varios años y es duradedro, un electrodomestico que no te abandona", DEFAULT, DEFAULT ),
(DEFAULT, 7, 6, "No lo recomiendo, se me rompio a la semana ", DEFAULT, DEFAULT),
(DEFAULT, 1, 5, "Muy buen producto, muy recomendable como primera compra", DEFAULT, DEFAULT),
(DEFAULT, 10, 7, "Buen producto, poco recomendable", DEFAULT, DEFAULT),
(DEFAULT, 2, 1, "Mal producto", DEFAULT, DEFAULT),
(DEFAULT, 5, 7, "Excelente producto", DEFAULT, DEFAULT),
(DEFAULT, 6, 4, "Pesimo Producto", DEFAULT, DEFAULT),
(DEFAULT, 8, 3, "Buen producto", DEFAULT, DEFAULT),
(DEFAULT, 9, 6, "Muy recomendable", DEFAULT, DEFAULT);