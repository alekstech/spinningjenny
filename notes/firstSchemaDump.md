--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-09-26 21:12:40 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2506 (class 1262 OID 16397)
-- Dependencies: 2505
-- Name: tm; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE tm IS 'Textile Museum Volunteer Platform';


--
-- TOC entry 1 (class 3079 OID 12655)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2508 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 192 (class 1259 OID 17391)
-- Name: AreaVolunteers; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "AreaVolunteers" (
    id integer NOT NULL,
    joined timestamp with time zone,
    "left" timestamp with time zone,
    regular boolean,
    floater boolean,
    notes character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "AreaVolunteers" OWNER TO tmadmin;

--
-- TOC entry 191 (class 1259 OID 17389)
-- Name: AreaVolunteers_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "AreaVolunteers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "AreaVolunteers_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2509 (class 0 OID 0)
-- Dependencies: 191
-- Name: AreaVolunteers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "AreaVolunteers_id_seq" OWNED BY "AreaVolunteers".id;


--
-- TOC entry 190 (class 1259 OID 17383)
-- Name: Areas; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Areas" (
    id integer NOT NULL,
    date timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Areas" OWNER TO tmadmin;

--
-- TOC entry 189 (class 1259 OID 17381)
-- Name: Areas_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Areas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Areas_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2510 (class 0 OID 0)
-- Dependencies: 189
-- Name: Areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Areas_id_seq" OWNED BY "Areas".id;


--
-- TOC entry 200 (class 1259 OID 17449)
-- Name: AwardTypes; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "AwardTypes" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AwardId" integer
);


ALTER TABLE "AwardTypes" OWNER TO tmadmin;

--
-- TOC entry 199 (class 1259 OID 17447)
-- Name: AwardTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "AwardTypes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "AwardTypes_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2511 (class 0 OID 0)
-- Dependencies: 199
-- Name: AwardTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "AwardTypes_id_seq" OWNED BY "AwardTypes".id;


--
-- TOC entry 198 (class 1259 OID 17436)
-- Name: Awards; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Awards" (
    id integer NOT NULL,
    date timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "VolunteerId" integer
);


ALTER TABLE "Awards" OWNER TO tmadmin;

--
-- TOC entry 197 (class 1259 OID 17434)
-- Name: Awards_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Awards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Awards_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2512 (class 0 OID 0)
-- Dependencies: 197
-- Name: Awards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Awards_id_seq" OWNED BY "Awards".id;


--
-- TOC entry 188 (class 1259 OID 16415)
-- Name: Developers; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Developers" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Developers" OWNER TO tmadmin;

--
-- TOC entry 187 (class 1259 OID 16413)
-- Name: Developers_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Developers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Developers_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2513 (class 0 OID 0)
-- Dependencies: 187
-- Name: Developers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Developers_id_seq" OWNED BY "Developers".id;


--
-- TOC entry 194 (class 1259 OID 17399)
-- Name: Events; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Events" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    location character varying(255),
    start timestamp with time zone,
    "end" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Events" OWNER TO tmadmin;

--
-- TOC entry 193 (class 1259 OID 17397)
-- Name: Events_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Events_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2514 (class 0 OID 0)
-- Dependencies: 193
-- Name: Events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Events_id_seq" OWNED BY "Events".id;


--
-- TOC entry 202 (class 1259 OID 17462)
-- Name: Sessions; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Sessions" (
    id integer NOT NULL,
    expiration timestamp with time zone,
    "sessionToken" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "VolunteerId" integer
);


ALTER TABLE "Sessions" OWNER TO tmadmin;

--
-- TOC entry 201 (class 1259 OID 17460)
-- Name: Sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Sessions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Sessions_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2515 (class 0 OID 0)
-- Dependencies: 201
-- Name: Sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Sessions_id_seq" OWNED BY "Sessions".id;


--
-- TOC entry 204 (class 1259 OID 17475)
-- Name: Shifts; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Shifts" (
    id integer NOT NULL,
    weekday integer,
    "sessionToken" character varying(255),
    "startTime" timestamp with time zone,
    "endTime" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AreaId" integer
);


ALTER TABLE "Shifts" OWNER TO tmadmin;

--
-- TOC entry 203 (class 1259 OID 17473)
-- Name: Shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Shifts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Shifts_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2516 (class 0 OID 0)
-- Dependencies: 203
-- Name: Shifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Shifts_id_seq" OWNED BY "Shifts".id;


--
-- TOC entry 186 (class 1259 OID 16402)
-- Name: Users; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Users" OWNER TO tmadmin;

--
-- TOC entry 185 (class 1259 OID 16400)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2517 (class 0 OID 0)
-- Dependencies: 185
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- TOC entry 196 (class 1259 OID 17410)
-- Name: Volunteers; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Volunteers" (
    id integer NOT NULL,
    "isAdmin" boolean,
    "isStaff" boolean,
    "firstName" character varying(255),
    "familyName" character varying(255),
    "startDate" date,
    "quitDate" date,
    phone integer,
    "emergencyName" character varying(255),
    "emergencyPhone" integer,
    "nonAdminsCanView" boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AreaId" integer,
    "AreaVolunteerId" integer,
    "EventId" integer
);


ALTER TABLE "Volunteers" OWNER TO tmadmin;

--
-- TOC entry 195 (class 1259 OID 17408)
-- Name: Volunteers_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Volunteers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Volunteers_id_seq" OWNER TO tmadmin;

--
-- TOC entry 2518 (class 0 OID 0)
-- Dependencies: 195
-- Name: Volunteers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Volunteers_id_seq" OWNED BY "Volunteers".id;


--
-- TOC entry 2328 (class 2604 OID 17394)
-- Name: AreaVolunteers id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AreaVolunteers" ALTER COLUMN id SET DEFAULT nextval('"AreaVolunteers_id_seq"'::regclass);


--
-- TOC entry 2327 (class 2604 OID 17386)
-- Name: Areas id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Areas" ALTER COLUMN id SET DEFAULT nextval('"Areas_id_seq"'::regclass);


--
-- TOC entry 2332 (class 2604 OID 17452)
-- Name: AwardTypes id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AwardTypes" ALTER COLUMN id SET DEFAULT nextval('"AwardTypes_id_seq"'::regclass);


--
-- TOC entry 2331 (class 2604 OID 17439)
-- Name: Awards id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Awards" ALTER COLUMN id SET DEFAULT nextval('"Awards_id_seq"'::regclass);


--
-- TOC entry 2326 (class 2604 OID 16418)
-- Name: Developers id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Developers" ALTER COLUMN id SET DEFAULT nextval('"Developers_id_seq"'::regclass);


--
-- TOC entry 2329 (class 2604 OID 17402)
-- Name: Events id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Events" ALTER COLUMN id SET DEFAULT nextval('"Events_id_seq"'::regclass);


--
-- TOC entry 2333 (class 2604 OID 17465)
-- Name: Sessions id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Sessions" ALTER COLUMN id SET DEFAULT nextval('"Sessions_id_seq"'::regclass);


--
-- TOC entry 2334 (class 2604 OID 17478)
-- Name: Shifts id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Shifts" ALTER COLUMN id SET DEFAULT nextval('"Shifts_id_seq"'::regclass);


--
-- TOC entry 2325 (class 2604 OID 16405)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- TOC entry 2330 (class 2604 OID 17413)
-- Name: Volunteers id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Volunteers" ALTER COLUMN id SET DEFAULT nextval('"Volunteers_id_seq"'::regclass);


--
-- TOC entry 2488 (class 0 OID 17391)
-- Dependencies: 192
-- Data for Name: AreaVolunteers; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "AreaVolunteers" (id, joined, "left", regular, floater, notes, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2519 (class 0 OID 0)
-- Dependencies: 191
-- Name: AreaVolunteers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"AreaVolunteers_id_seq"', 1, false);


--
-- TOC entry 2486 (class 0 OID 17383)
-- Dependencies: 190
-- Data for Name: Areas; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Areas" (id, date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2520 (class 0 OID 0)
-- Dependencies: 189
-- Name: Areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Areas_id_seq"', 1, false);


--
-- TOC entry 2496 (class 0 OID 17449)
-- Dependencies: 200
-- Data for Name: AwardTypes; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "AwardTypes" (id, name, "createdAt", "updatedAt", "AwardId") FROM stdin;
\.


--
-- TOC entry 2521 (class 0 OID 0)
-- Dependencies: 199
-- Name: AwardTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"AwardTypes_id_seq"', 1, false);


--
-- TOC entry 2494 (class 0 OID 17436)
-- Dependencies: 198
-- Data for Name: Awards; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Awards" (id, date, "createdAt", "updatedAt", "VolunteerId") FROM stdin;
\.


--
-- TOC entry 2522 (class 0 OID 0)
-- Dependencies: 197
-- Name: Awards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Awards_id_seq"', 1, false);


--
-- TOC entry 2484 (class 0 OID 16415)
-- Dependencies: 188
-- Data for Name: Developers; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Developers" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Andre	2017-09-12 12:09:40-04	2017-09-12 12:09:40-04
2	Claire	2017-09-12 12:09:40-04	2017-09-12 12:09:40-04
4	Aleks	2017-09-12 12:09:40-04	2017-09-12 12:09:40-04
3	Teddy	2017-09-12 12:09:40-04	2017-09-12 12:09:40-04
\.


--
-- TOC entry 2523 (class 0 OID 0)
-- Dependencies: 187
-- Name: Developers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Developers_id_seq"', 1, false);


--
-- TOC entry 2490 (class 0 OID 17399)
-- Dependencies: 194
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Events" (id, name, description, location, start, "end", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2524 (class 0 OID 0)
-- Dependencies: 193
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Events_id_seq"', 1, false);


--
-- TOC entry 2498 (class 0 OID 17462)
-- Dependencies: 202
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Sessions" (id, expiration, "sessionToken", "createdAt", "updatedAt", "VolunteerId") FROM stdin;
\.


--
-- TOC entry 2525 (class 0 OID 0)
-- Dependencies: 201
-- Name: Sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Sessions_id_seq"', 1, false);


--
-- TOC entry 2500 (class 0 OID 17475)
-- Dependencies: 204
-- Data for Name: Shifts; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Shifts" (id, weekday, "sessionToken", "startTime", "endTime", "createdAt", "updatedAt", "AreaId") FROM stdin;
\.


--
-- TOC entry 2526 (class 0 OID 0)
-- Dependencies: 203
-- Name: Shifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Shifts_id_seq"', 1, false);


--
-- TOC entry 2482 (class 0 OID 16402)
-- Dependencies: 186
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Users" (id, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2527 (class 0 OID 0)
-- Dependencies: 185
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, false);


--
-- TOC entry 2492 (class 0 OID 17410)
-- Dependencies: 196
-- Data for Name: Volunteers; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Volunteers" (id, "isAdmin", "isStaff", "firstName", "familyName", "startDate", "quitDate", phone, "emergencyName", "emergencyPhone", "nonAdminsCanView", "createdAt", "updatedAt", "AreaId", "AreaVolunteerId", "EventId") FROM stdin;
1	t	t	Aleksander	Sobieraj	2017-07-01	\N	1234567890	Justin	1234567890	t	2017-09-26 14:36:25.745-04	2017-09-26 14:36:25.745-04	\N	\N	\N
\.


--
-- TOC entry 2528 (class 0 OID 0)
-- Dependencies: 195
-- Name: Volunteers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Volunteers_id_seq"', 1, true);


--
-- TOC entry 2344 (class 2606 OID 17396)
-- Name: AreaVolunteers AreaVolunteers_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AreaVolunteers"
    ADD CONSTRAINT "AreaVolunteers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2342 (class 2606 OID 17388)
-- Name: Areas Areas_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Areas"
    ADD CONSTRAINT "Areas_pkey" PRIMARY KEY (id);


--
-- TOC entry 2352 (class 2606 OID 17454)
-- Name: AwardTypes AwardTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AwardTypes"
    ADD CONSTRAINT "AwardTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 2350 (class 2606 OID 17441)
-- Name: Awards Awards_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Awards"
    ADD CONSTRAINT "Awards_pkey" PRIMARY KEY (id);


--
-- TOC entry 2340 (class 2606 OID 16420)
-- Name: Developers Developers_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Developers"
    ADD CONSTRAINT "Developers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2346 (class 2606 OID 17407)
-- Name: Events Events_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);


--
-- TOC entry 2354 (class 2606 OID 17467)
-- Name: Sessions Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2356 (class 2606 OID 17480)
-- Name: Shifts Shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Shifts"
    ADD CONSTRAINT "Shifts_pkey" PRIMARY KEY (id);


--
-- TOC entry 2336 (class 2606 OID 16412)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 2338 (class 2606 OID 16410)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2348 (class 2606 OID 17418)
-- Name: Volunteers Volunteers_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Volunteers"
    ADD CONSTRAINT "Volunteers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2361 (class 2606 OID 17455)
-- Name: AwardTypes AwardTypes_AwardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AwardTypes"
    ADD CONSTRAINT "AwardTypes_AwardId_fkey" FOREIGN KEY ("AwardId") REFERENCES "Awards"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2360 (class 2606 OID 17442)
-- Name: Awards Awards_VolunteerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Awards"
    ADD CONSTRAINT "Awards_VolunteerId_fkey" FOREIGN KEY ("VolunteerId") REFERENCES "Volunteers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2362 (class 2606 OID 17468)
-- Name: Sessions Sessions_VolunteerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Sessions"
    ADD CONSTRAINT "Sessions_VolunteerId_fkey" FOREIGN KEY ("VolunteerId") REFERENCES "Volunteers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2363 (class 2606 OID 17481)
-- Name: Shifts Shifts_AreaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Shifts"
    ADD CONSTRAINT "Shifts_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES "Areas"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2357 (class 2606 OID 17419)
-- Name: Volunteers Volunteers_AreaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Volunteers"
    ADD CONSTRAINT "Volunteers_AreaId_fkey" FOREIGN KEY ("AreaId") REFERENCES "Areas"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2358 (class 2606 OID 17424)
-- Name: Volunteers Volunteers_AreaVolunteerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Volunteers"
    ADD CONSTRAINT "Volunteers_AreaVolunteerId_fkey" FOREIGN KEY ("AreaVolunteerId") REFERENCES "AreaVolunteers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2359 (class 2606 OID 17429)
-- Name: Volunteers Volunteers_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Volunteers"
    ADD CONSTRAINT "Volunteers_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 1710 (class 826 OID 16399)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO tmadmin;


-- Completed on 2017-09-26 21:12:40 EDT

--
-- PostgreSQL database dump complete
--

