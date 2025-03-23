--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.blogs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    created_by uuid NOT NULL,
    tag character varying(255),
    access_type character varying(255),
    shared_for character varying(255),
    belong_to uuid
);


ALTER TABLE public.blogs OWNER TO corodomo_admin;

--
-- Name: exam_parts; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.exam_parts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    exam_section_id uuid NOT NULL
);


ALTER TABLE public.exam_parts OWNER TO corodomo_admin;

--
-- Name: exam_sections; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.exam_sections (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    skill character varying NOT NULL,
    duration double precision NOT NULL,
    exam_id uuid NOT NULL
);


ALTER TABLE public.exam_sections OWNER TO corodomo_admin;

--
-- Name: exams; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.exams (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    participants_count integer DEFAULT 0 NOT NULL,
    categories character varying NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.exams OWNER TO corodomo_admin;

--
-- Name: folders; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.folders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.folders OWNER TO corodomo_admin;

--
-- Name: group_tasks; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.group_tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying,
    theme_color character varying,
    created_by uuid NOT NULL,
    project_id uuid NOT NULL
);


ALTER TABLE public.group_tasks OWNER TO corodomo_admin;

--
-- Name: lesson_comments; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.lesson_comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL,
    lesson_id uuid NOT NULL,
    reply_id uuid,
    content character varying NOT NULL
);


ALTER TABLE public.lesson_comments OWNER TO corodomo_admin;

--
-- Name: lesson_notes; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.lesson_notes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    content character varying NOT NULL,
    created_by uuid NOT NULL,
    lesson_id uuid NOT NULL
);


ALTER TABLE public.lesson_notes OWNER TO corodomo_admin;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.lessons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    youtube_url character varying NOT NULL,
    thumbnail character varying,
    full_subtitles character varying,
    tag character varying,
    minimap_id character varying,
    duration double precision DEFAULT '0'::double precision NOT NULL,
    watched_count integer DEFAULT 0 NOT NULL,
    watched_at timestamp without time zone,
    language character varying NOT NULL,
    folder_id uuid NOT NULL,
    created_by uuid NOT NULL,
    title character varying NOT NULL,
    level character varying
);


ALTER TABLE public.lessons OWNER TO corodomo_admin;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO corodomo_admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: corodomo_admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO corodomo_admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: corodomo_admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: noted_vocabularies; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.noted_vocabularies (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    text character varying NOT NULL,
    translated_text character varying NOT NULL,
    lesson_id uuid NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.noted_vocabularies OWNER TO corodomo_admin;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.notes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.notes OWNER TO corodomo_admin;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    "desc" character varying,
    started_at timestamp without time zone NOT NULL,
    ended_at timestamp without time zone NOT NULL,
    workspace_id uuid NOT NULL
);


ALTER TABLE public.projects OWNER TO corodomo_admin;

--
-- Name: question_choices; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.question_choices (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    content character varying NOT NULL,
    option character varying NOT NULL,
    question_id uuid NOT NULL
);


ALTER TABLE public.question_choices OWNER TO corodomo_admin;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.questions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    answer character varying NOT NULL,
    exam_part_id uuid NOT NULL
);


ALTER TABLE public.questions OWNER TO corodomo_admin;

--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.quizzes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    question character varying NOT NULL,
    choices character varying NOT NULL,
    answer character(1) NOT NULL,
    lesson_id uuid NOT NULL
);


ALTER TABLE public.quizzes OWNER TO corodomo_admin;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.songs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    author character varying NOT NULL,
    duration double precision DEFAULT '0'::double precision NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.songs OWNER TO corodomo_admin;

--
-- Name: sub_tasks; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.sub_tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    theme_color character varying NOT NULL,
    assignees character varying NOT NULL,
    tags character varying NOT NULL,
    started_at timestamp without time zone NOT NULL,
    ended_at timestamp without time zone NOT NULL,
    task_id uuid NOT NULL
);


ALTER TABLE public.sub_tasks OWNER TO corodomo_admin;

--
-- Name: subtitles; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.subtitles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    text character varying NOT NULL,
    duration double precision DEFAULT '0'::double precision NOT NULL,
    "offset" double precision DEFAULT '0'::double precision NOT NULL,
    language character varying NOT NULL,
    lesson_id uuid NOT NULL
);


ALTER TABLE public.subtitles OWNER TO corodomo_admin;

--
-- Name: task_comments; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.task_comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    content character varying,
    created_by uuid NOT NULL,
    task_id uuid NOT NULL
);


ALTER TABLE public.task_comments OWNER TO corodomo_admin;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    theme_color character varying NOT NULL,
    assignees character varying,
    tags character varying,
    started_at timestamp without time zone NOT NULL,
    ended_at timestamp without time zone NOT NULL,
    group_task_id uuid NOT NULL
);


ALTER TABLE public.tasks OWNER TO corodomo_admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'learner'::character varying NOT NULL,
    email_verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO corodomo_admin;

--
-- Name: vocabularies; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.vocabularies (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    word character varying NOT NULL,
    type character varying NOT NULL,
    lesson_id uuid NOT NULL
);


ALTER TABLE public.vocabularies OWNER TO corodomo_admin;

--
-- Name: workspaces; Type: TABLE; Schema: public; Owner: corodomo_admin
--

CREATE TABLE public.workspaces (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    members character varying,
    created_by uuid NOT NULL
);


ALTER TABLE public.workspaces OWNER TO corodomo_admin;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.blogs (id, created_at, updated_at, title, content, created_by, tag, access_type, shared_for, belong_to) FROM stdin;
1040778a-d5e0-42c8-ab11-ff00f7ea7d27	2025-03-22 07:03:23.484327	2025-03-22 07:03:23.484327	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
5f066b68-5ed3-4045-8a07-674c7da07863	2025-03-22 07:17:13.247879	2025-03-22 07:17:13.247879	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
822d2872-7b39-4ef8-92f5-406d80c01b49	2025-03-22 07:16:16.649498	2025-03-22 07:16:16.649498	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
846b05c9-0b50-4970-97af-57777a7bff55	2025-03-22 07:18:27.418042	2025-03-22 07:18:27.418042	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
c009d9b7-c5fd-4e17-9153-d4307a7e7dcc	2025-03-22 07:18:58.314847	2025-03-22 07:18:58.314847	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
e00d97ed-7d98-40cf-a4c0-1c7bf15e7d85	2025-03-22 07:09:40.882928	2025-03-22 07:09:40.882928	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
0817fd39-0f6f-458e-9373-a952afff5265	2025-03-22 08:19:39.119862	2025-03-22 08:19:39.119862	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
78e38491-ce9a-4dc5-ba5c-198b380eacdc	2025-03-22 08:19:55.923349	2025-03-22 08:19:55.923349	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
0af1cf2e-37bf-4e09-bd15-b1063c828830	2025-03-22 08:20:09.75771	2025-03-22 08:20:09.75771	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
feb0517f-cd57-4499-82be-6be60539cbb4	2025-03-22 08:20:16.73595	2025-03-22 08:20:16.73595	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"e07dec84-1737-4af3-bb1a-e94cf567ba6c","fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	\N
4b0732dc-5107-4ca7-b291-080ebbbfee94	2025-03-22 08:22:11.484094	2025-03-22 08:22:11.484094	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"e07dec84-1737-4af3-bb1a-e94cf567ba6c","fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	\N
1ac904de-4971-42de-a698-d439d0617bb5	2025-03-22 08:24:58.230073	2025-03-22 08:24:58.230073	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	\N
4fdc1d59-6a94-4065-877c-53c658273752	2025-03-22 08:25:56.832231	2025-03-22 08:25:56.832231	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"e07dec84-1737-4af3-bb1a-e94cf567ba6c","fec6fc87-cc63-4fb8-9f06-"}	\N
15b18ebf-0c55-4073-a312-5db06b5e7b8a	2025-03-22 08:26:19.970182	2025-03-22 08:26:19.970182	test3	test5	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"e07dec84-1737-4af3-bb1a-e94cf567ba6c","fec6fc87-cc63-4fb8-9f06-"}	\N
998c1266-d411-4935-8eb1-5238b214e81b	2025-03-22 10:34:12.569122	2025-03-22 10:34:12.569122	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"fec6fc87-cc63-4fb8-9f06-4e51a5c209b5","e07dec84-1737-4af3-bb1a-e94cf567ba6c"}	3fa85f64-5717-4562-b3fc-2c963f66afa6
2d600988-a630-43cc-8b33-f27300953fbb	2025-03-22 10:34:40.305437	2025-03-22 10:34:40.305437	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6c	3fa85f64-5717-4562-b3fc-2c963f66afa6
d5aa480b-ed0e-4a0b-aebb-f7172d8d694a	2025-03-22 10:34:41.234968	2025-03-22 10:34:41.234968	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6c	3fa85f64-5717-4562-b3fc-2c963f66afa6
6488df04-a7cf-4ac0-8dda-f461ba92476b	2025-03-22 10:35:59.35501	2025-03-22 10:35:59.35501	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6c	3fa85f64-5717-4562-b3fc-2c963f66afa6
a7702355-861e-4c4e-82be-8c7e4dd43af7	2025-03-22 10:38:55.61662	2025-03-22 10:38:55.61662	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6c	3fa85f64-5717-4562-b3fc-2c963f66afa6
a3aacb31-6e47-4292-a971-443e53b28df5	2025-03-22 10:38:59.956561	2025-03-22 10:38:59.956561	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6	3fa85f64-5717-4562-b3fc-2c963f66afa6
18a8fb8c-215d-4540-b75e-09f870692fd0	2025-03-22 10:39:02.613454	2025-03-22 10:39:02.613454	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf56	3fa85f64-5717-4562-b3fc-2c963f66afa6
ebba2600-b1e6-4b29-8efa-bc3e5cc6966d	2025-03-22 11:38:03.20514	2025-03-22 11:38:03.20514	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	3fa85f64-5717-4562-b3fc-2c963f66afa6
31864da8-f51f-4fc4-ab47-72b71ccf3619	2025-03-22 11:38:14.021266	2025-03-22 11:38:14.021266	new	new	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	3fa85f64-5717-4562-b3fc-2c963f66afa6
7efad7be-f207-4c75-8b1d-8bd0f2951a3d	2025-03-22 11:38:39.200532	2025-03-22 11:38:39.200532	new	new	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5,e07dec84-1737-4af3-bb1a-e94cf567ba6c	3fa85f64-5717-4562-b3fc-2c963f66afa6
cc3c9572-a158-41ef-8f03-6f2be80ed9e9	2025-03-22 13:03:41.640905	2025-03-22 13:03:41.640905	new	new	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	3fa85f64-5717-4562-b3fc-2c963f66afa6
7da3001a-c7e9-499e-a772-cebb4d20c14e	2025-03-22 13:04:13.513453	2025-03-22 13:04:13.513453	new	new	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	3fa85f64-5717-4562-b3fc-2c963f66afa6
6ded18b0-8c37-48f3-b53e-ccfb7a55bc28	2025-03-22 13:04:36.789581	2025-03-22 13:04:36.789581	new	new	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	3fa85f64-5717-4562-b3fc-2c963f66afa6
e0b2c021-5b4e-49ec-9165-d6e9077c5d06	2025-03-22 13:05:17.45017	2025-03-22 13:05:17.45017	new33	new33	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	{"fec6fc87-cc63-4fb8-9f06-4e51a5c209b5"}	3fa85f64-5717-4562-b3fc-2c963f66afa6
537511b0-fca9-4f09-9e5b-d16437ef1506	2025-03-22 13:06:35.370886	2025-03-22 13:06:35.370886	new33	new33	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	3fa85f64-5717-4562-b3fc-2c963f66afa6
157d8b2a-1264-4a90-88b2-bc7104d709a4	2025-03-22 06:43:52.425709	2025-03-22 06:43:52.425709	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	AI	read	\N	08647687-5703-4519-97ea-6ab3de33ebb5
31bc6519-56c2-4d0c-ae31-c92f47098189	2025-03-22 06:44:15.228343	2025-03-22 06:44:15.228343	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	mindset	write	\N	157d8b2a-1264-4a90-88b2-bc7104d709a4
413b32db-9482-4843-b43f-f799f2ad0cc7	2025-03-22 06:43:20.375943	2025-03-22 06:43:20.375943	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	AI	read	\N	157d8b2a-1264-4a90-88b2-bc7104d709a4
6730a5ca-c138-4ad3-b8ce-0243a03d5547	2025-03-22 06:56:26.414675	2025-03-22 06:56:26.414675	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	\N	631970bc-b79a-4837-884c-10a2d613a987
5cf70586-cf25-41b7-9358-d387a9c794ff	2025-03-22 06:43:53.204032	2025-03-22 06:43:53.204032	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	AI	read	\N	08647687-5703-4519-97ea-6ab3de33ebb5
631970bc-b79a-4837-884c-10a2d613a987	2025-03-22 06:56:14.345572	2025-03-22 06:56:14.345572	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	\N	5cf70586-cf25-41b7-9358-d387a9c794ff
6be50a36-cca9-4b93-ba80-3207c8312b48	2025-03-22 07:03:24.217796	2025-03-22 07:03:24.217796	test	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	\N	\N
3653e26f-0e7a-46d8-a0fc-32447a752e26	2025-03-22 07:21:24.496191	2025-03-22 07:21:24.496191	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
ecb4063e-723b-47f1-a96a-5773d64e5f9d	2025-03-22 07:22:12.941456	2025-03-22 07:22:12.941456	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
d4a33608-1124-48fe-8c4f-41e614bf260b	2025-03-22 08:17:20.437123	2025-03-22 08:17:20.437123	test3	test3	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c,e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
08647687-5703-4519-97ea-6ab3de33ebb5	2025-03-22 06:56:08.984201	2025-03-22 06:56:08.984201	string	string	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	study-w/m	read	e07dec84-1737-4af3-bb1a-e94cf567ba6c	\N
05bc5e99-1cbe-4312-86be-976423e5ec79	2025-03-22 13:12:43.726132	2025-03-22 08:18:17.66413	updated test	updated test	e07dec84-1737-4af3-bb1a-e94cf567ba6c	study-w/m	read	8085a88b-27ea-482f-b80d-ad4b80cee9ef	\N
\.


--
-- Data for Name: exam_parts; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.exam_parts (id, created_at, updated_at, title, exam_section_id) FROM stdin;
\.


--
-- Data for Name: exam_sections; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.exam_sections (id, created_at, updated_at, title, skill, duration, exam_id) FROM stdin;
\.


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.exams (id, created_at, updated_at, title, participants_count, categories, created_by) FROM stdin;
\.


--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.folders (id, created_at, updated_at, name, created_by) FROM stdin;
a6eaa25e-5531-4168-b178-7b1b35c5d9bd	2025-03-17 17:12:07.479182	2025-03-17 17:12:07.479182	My Playlist	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
5925f66d-56a1-4ebe-9750-7748c514762d	2025-03-17 17:32:28.454481	2025-03-17 16:43:34.900979	Chill Playlist	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
2d1e8136-8c7c-4061-b601-d57e56786366	2025-03-17 17:32:48.692339	2025-03-17 17:32:48.692339	Healing Playlist	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
68003ed8-284e-4abc-b1f4-52624ef26c85	2025-03-23 07:55:19.832165	2025-03-23 07:55:19.832165	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
\.


--
-- Data for Name: group_tasks; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.group_tasks (id, created_at, updated_at, title, theme_color, created_by, project_id) FROM stdin;
\.


--
-- Data for Name: lesson_comments; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.lesson_comments (id, created_at, updated_at, created_by, lesson_id, reply_id, content) FROM stdin;
b0570b86-61ed-4481-86c9-c41e5f7bd9ef	2025-03-20 16:53:52.146192	2025-03-19 15:22:52.480433	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e5453351-57b0-437e-ae15-a89228f01437	\N	update3
d7d0040e-a8be-45a1-96b1-3524e7c77c37	2025-03-20 16:57:20.134058	2025-03-20 16:57:20.134058	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e5453351-57b0-437e-ae15-a89228f01437	\N	123
b076af98-104e-4a47-b450-750cf6727f75	2025-03-20 16:57:22.525404	2025-03-20 16:57:22.525404	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e5453351-57b0-437e-ae15-a89228f01437	\N	helo
63407a2f-f95c-4774-aa51-a2ce0cf223ac	2025-03-20 16:57:25.582729	2025-03-20 16:57:25.582729	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e5453351-57b0-437e-ae15-a89228f01437	\N	test
2fab9702-97b0-4b94-a06d-31b59f652638	2025-03-22 05:45:38.291177	2025-03-22 05:45:38.291177	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e43e388c-a728-4b53-b4c3-49f8adaf3434	\N	test
\.


--
-- Data for Name: lesson_notes; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.lesson_notes (id, created_at, updated_at, content, created_by, lesson_id) FROM stdin;
42f2cffb-f441-4162-b483-02f6d3ab5f95	2025-03-22 05:26:44.319748+00	2025-03-22 05:26:44.319748+00	test	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	e43e388c-a728-4b53-b4c3-49f8adaf3434
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.lessons (id, created_at, updated_at, youtube_url, thumbnail, full_subtitles, tag, minimap_id, duration, watched_count, watched_at, language, folder_id, created_by, title, level) FROM stdin;
11d837c1-52c3-4c94-a1c4-3ad7977beeb0	2025-03-19 14:33:21.574542	2025-03-19 14:33:21.574542	https://www.youtube.com/watch?v=AakJ7YuDjUA&list=TLGGv2rg7twdY-kxODAzMjAyNQ	https://i.ytimg.com/vi_webp/AakJ7YuDjUA/maxresdefault.webp	\N	Education	\N	650	0	\N	ja	a6eaa25e-5531-4168-b178-7b1b35c5d9bd	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	 Lost Frequencies feat. Janieck Devy - Reality (Official Music Video) 	B2
46893bf0-0f2a-407c-84c5-aec4bc8380b1	2025-03-19 14:31:57.345136	2025-03-19 14:31:57.345136	https://www.youtube.com/watch?v=Tf0cJGO52xc	https://i.ytimg.com/vi_webp/Tf0cJGO52xc/maxresdefault.webp	\N	Music	\N	191	0	\N	en	a6eaa25e-5531-4168-b178-7b1b35c5d9bd	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	 Lost Frequencies feat. Janieck Devy - Reality (Official Music Video) 	B1
e5453351-57b0-437e-ae15-a89228f01437	2025-03-19 14:48:51.705635	2025-03-18 14:05:24.21372	https://www.youtube.com/watch?v=AakJ7YuDjUA&list=TLGGv2rg7twdY-kxODAzMjAyNQ	https://img.youtube.com/vi/VsuWTUJeZoU/maxresdefault.jpg	. 皆さんこんにちは！Bite size Japaneseのレイラです。. 元気ですか？今日は3月の6日ですね。. 多分皆さんがこのエピソードを聞いてるのは、来週、再来週ぐらいかなと思うんですが、元気ですか？. 日本は3月になって、やっとちょっと暖かくなってきました。. 私はまだね、出かける時はコートを着てるんだけど、でもね、ほんと２月に比べたら本当に暖かくなりました。. 今年の日本の2月は急にね、ものすごく寒くなって、日本中で雪が降ったんですね。. で、私が住んでるこの岡山の南は、全然雪は降らないんだけど、ほんとね、今年の2月はこう、. 毎日、こう、雪は積もらないけども、雪が降るみたいな感じで、本当に寒かったんですね。. 日本の北の方ってスキーで有名ですよね。. 長野県とか新潟県とかさ、結構スキーで有名なんだけど、そういう雪がすごい積もる地域も. 今年の2月はむっちゃむっちゃ雪が降ったりして、. スキーに来た観光客の人達がほんと困るぐらい大変だったそうです。. 月になって暖かくなってきて嬉しいですね。. で、今日のエピソードでは、日本人が使うほめ言葉を紹介したいと思います。. ほめ言葉、人をほめる時に使う言葉ですね。. で、まずはじゃ、人の見た目をほめる時の言葉から紹介します。. 私は一応女の子なので、どちらかというと、女の子が使うほめ言葉を知ってるんだけど、まず1つ目は「目が大きい」ですね。. 「目が大きい」とか「まつげ長いね」とかね。. これほめ言葉なんですね。. 「わぁレイラさん、まつ毛長いですね」とか「めっちゃ目きれいだね」とか「目が大きいね」っていうのがほめ言葉です。. 何か、やっぱね、日本の女の子は、結構目が丸くて、大きいのが好きなんですね。. で、でも日本人ってアジア人だし、普通の人はそんなさ、目が大きくない. どちらかと言うと、細い目をしてるんですよね。. 目を開けた時に、目の上にできる線がありますよね。. で、その線がない人もいますよね。. その線がない時をない目を「一重（ひとえ）」って言います。. で、目を開けた時に目の上に線ができると、これが二重（ふたえ）なんですね。. で、特に若い女の子は二重（ふたえ）に憧れていて、. 一重（ひとえ）の子は、目の上にね、薄いテープを貼って、目を開けた時に、この二重（ふたえ）のようなこの線ができるように. メイクをしたりとかね、してる人が結構多いです。. 私は結構どんな目も好きですね。目ってやっぱり人種によって本当に違うけど、. 特に特徴がある目って私すごい好きで、なんか、一重（ひとえ）でもやっぱ、すごいかっこいい目ってあるんですよね。. でも日本人はの女の子はだいたい「目が大きいね」っていうのはほめ言葉で、. 「目が細い」とか「目が小さい」っていうのは、逆にちょっと悪口というか、そんなね、ほめ言葉としては使わないんですよね。. で、あとは、「鼻が高い」っていうのもほめ言葉みたいに使う人がいます。. で、あとは「顔が小さい」もほめ言葉なんですね。. こう、顔が小さくて、足が長いモデルスーパーモデルみたいなスタイルがすごく理想的。. みんなが憧れる体の形なんですよね。. だから、「顔、小さいね」とか、「めっちゃ足長いね」とか、「スタイルいいね」とか、. 「細いね」っていうのは、ほんと、ほめ言葉として特にね女の子たちはよく使います。. で、男の子に使うほめ言葉は、私あんまり思いつかないんだけど、「イケメン」とか「かっこいい」ですよね。. で、最近は「イケメン」とか言う言葉を、女の子にも使ったりする。. その女の子の中でも何かこう、他の友達を守ってくれるような女の子もいますよね。. すごくしっかりしてて、みんなが頼れるような女の子を結構、「イケメン」、. なんか、すごい頼れるっていうような女の子に、「めっちゃイケメン」とか言うこともあります。. はい、イケメンはなのでほめ言葉ですね。. 見た目だけじゃなくて、その人のやってることがかっこいいみたいな時に「イケメン」って使うこともよくあります。. じゃあ次は、仕事で使う職場で使うほめ言葉ね。. まあ、いろいろあるんだけど、やっぱり「仕事が早い」、「仕事が早い」とか. 「れいらさん、すごい仕事早いですね」とか、あと「頭いいですね\n」とかね。. これはすごいほめ言葉ね。あと、「さすがれいらさん、れいらさんはさすがですね。」. 「すごいですね」とか、「ほんと頼りになります。」. 「頼りになります」とか、あと、「センスいいですね」もよく使いますね。. センスって、よくファッションセンスがいい人、すごくおしゃれができる人にもセンスがいいですねって言うんだけど. このセンスっていう言葉は、ファッションとかだけじゃなくて、こう、人が、. 他の人が考えられないようなものを組み合わせて、新しい、カッコいいものを作れたりする人も時々いますよね。. で、そういう人を「センスがいい」って言ったりすることもあります。. すごくいいほめ言葉ですよね。. で、皆さんも知っていると思うけど、日本人ってだいたいほめられたら、. 「いえいえいえいえ....」「全然全然全然」みたいな. ほめられても、何かそれを認めるような返事はしない人がやっぱり多いですよね。. 「いやいた」「いえいえ」「いや、そんなことないです」っていうのが一番よくある返事のし方で、. 私もほめられたらやっぱり「いやいやいや」ってどうしても言ってしまう。. でも、ほめられた時に、冗談っぽく、冗談を言ってるみたいに. 「れいらさん」仕事早いですねっって言われたら、「ですよね笑」みたいな「でしょう？笑」みたいな、何か笑いながら、冗談っぽく「そうでしょう？笑」みたいな言う人も結構いる。. で、それってすごく楽しい返事だと思います。. 自分を「いや、そんなことない」って下に言う必要もなくて、冗談を言って楽しく、笑いに変えるみたいな感じの答え方で、私は結構好きです。. あとは普通に「れいらさん仕事早いですね」って言われたら「ええ、そうかな？ありがとうございます」みたいな。. 「本当ですか？嬉しいです！ありがとうございます！」みたいに、素直に. 「本当ですか？」って聞きながらも「ありがとうございます。嬉しいです。」っていう言葉も一緒に言うと、それもすごくいい返事のし方ですよね。. なんかさ、人をほめてあげても、その人が「いやいやいやいやいや」ってすごい申し訳ない感じになっちゃったら楽しくないんだけど. 人をほめた時にその人が「嬉しいです！ありがとうございます！」って言ってくれたり、. 「そうでしょう笑」みたいな、ハハハって冗談を言ってくれたりすると、空気が、雰囲気が、その場所が、なんか明るくなっていいなと思います。. こんな感じ。. 日本人がよく使うほめ言葉ですね。. 皆さんもね、ぜひ使ってみてください。. はい、ありがとうございます、最後まで聞いてくれて。. もしね、このポッドキャスト役に立ったら、メンバーシップのPatreonに入ってくれるとすごく嬉しいです。. Patreonでは、日本語のトランスクリプトとか、単語のリストとか、あとメンバーのエピソードもあるので、. ぜひね、興味がある人はメンバーになってくれると嬉しいです。. じゃあ今日はこんな感じで終わります。. 皆さんお疲れ様でした。. じゃあね！. バイバイ！	Podcast	GWmdqZUB4AZ4QtFsiIO9	623.3900000000001	0	\N	ja	a6eaa25e-5531-4168-b178-7b1b35c5d9bd	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	310 上手なプレゼンテーションの方法！😉	N4
f21efbd6-053c-4ae8-b35b-7e209aca8143	2025-03-21 12:54:55.54181	2025-03-21 12:39:45.052973	https://www.youtube.com/watch?list=TLGGJBhBFDKVF_EyMTAzMjAyNQ&v=QvWdAhao_Uc	https://i.ytimg.com/vi_webp/QvWdAhao_Uc/maxresdefault.webp	. はい皆さん、こんにちは。. Bite size Japaneseのレイラです。. 元気ですか？. 今日は発表の話をしたいと思います。. 「発表」＝プレゼンテーション. 昨日私、大学の論文の発表があったんですね。. 終わりました。. 最近ずっと論文で忙しかったんですけど. 昨日発表が終わって、論文が終わりました。. だからこの九月…九月に大学を卒業ですね。. 大学…修士課程(Master&amp;#39;s Degree). 修士を卒業。. いや…論文は実は、最後の四ヶ月ぐらい頑張って. その前はもう全然勉強していなかったんですよね。. だけど頑張って良かった！今終わって嬉しい！. テンションが上がっている⤴ という感じです。. だからこの夏は、自分が前からやりたかった事とか. 色々やってみたいなって思います。. 結構私、絵を描くのが好きだから. ちょっと絵を描いてみたり. 部屋を掃除したりとか. いろいろしたいなって思ってます。. で、今日は発表について話したいんだけど. 私結構、プレゼンテーションは. 自分で言うけど、結構上手だと思うんですね。. その理由は、結構練習もたくさんするし. 声が大きいんですよね。. はっきり ゆっくり話すから、結構上手だと思う。. だから今日は、上手な発表のやり方. 上手なプレゼンテーションのやり方. 私が知ってることをちょっと話したいなと思います。. だから…役に立つかな？みんなの。. 役に立たないかもしれないね、わからないけど。. でも私が得意なことだから. ちょっと今日はそれを話したいです。. で、私はずっと発表は昔から結構得意でした。. みんなの前で話すのはあんまり得意じゃないけど. 発表は得意なんです。. 私はリーダーのタイプではないけど発表はできる。. それはやっぱり練習だね。. 論文の発表の時も、その発表をする前に. ちゃんと原稿(script). 言いたい事を全部、紙にちゃんと全部書いて. それを覚えるくらいまで何回も言って. 本当に覚えるんですよね、ほとんど。. それぐらい練習する。. で、実は昨日の発表はZoomだったんですよね。. だから実は練習しなくても. このパソコンの横にタブレットを置いて. もうそれを読むだけだったんですけど. でも四回くらい全部読んで、読む練習をしました。. やっぱり初めて読むと、自分で書いた文章でも. 読むのって難しいんですよね。. やっぱり自分がちゃんと読む練習をしないと. どこで文章を切るとか. どこを強く言うとかがわからないですよね。. やっぱり大切なところは. ゆっくり はっきり言いたいし…わかります？. で、大切なところを言う前は. ちょっとこう…こんな感じで. 何も言わない時間を作ったりしたいですよね。. 言葉と言葉の間に何も言わない時間を少し作るとか. 大切なことを言った後は. 最後の「です」とか「ます」を. 「です↘」…低く言う。. 「です↗」じゃなくて「です↘」. こんな感じにすると. なんかカッコよく聞こえるなと思って発表しています。. だから、自分で発表することを. 全部ドキュメントに書いた後は. 何回も読む練習をするし. あとは発表の文章はすごく短くする。. 「〇〇ですが…」とか「が」で. たくさん文章を長くすると. やっぱり聞いている人は目じゃなくて. 耳で話を聞く、理解するから. やっぱり長いとなかなか覚えられないし. 理解できないと思うんですよね。. だから一つ一つの文章はすごく短くして. あと紙に書いていると「あれ」とか「それ」とか. 「この」とか という言葉を使いますよね。. だけど耳で聞いていると. 「あれってどのあれ？」みたいな. 「あれって何の事？」みたいになるから. 発表する時は、同じ事でも何回も言うし. あとは主語とかもしっかりちゃんと言ったりします。. そういうことを気を付けて. で、四回とか五回ちゃんと読む練習をすると. 本当に上手に話せる。. で、私が四年くらい前に大学を卒業した時の. 四年前の論文では. 本当に私、十分…七分の発表を. レジュメを作って、それを全部覚えて発表しました。. 一応紙は読んでもよかったけど、手に持っていたけど. 全部覚えて発表した。. それぐらいするとなんか…私は安心する。. やっぱり初めてあんまり練習しないでやる方が. 私は怖いなと思っていて。. あとはパワーポイントで一枚のページに. 絵とか図と、あとは文章を多くて三つとか。. 文章も文章じゃなくて、本当に単語だけとか. それぐらいシンプルにまとめた方が. わかりやすいなと思って。. なかなか難しいんだけどね。. 私もそこまではシンプルにできなかったけど. でも、できるだけ本当に. 大切なところしかパワーポイントには書かない. あとは全部話すという感じでまとめました。. で、私四年前の発表の時は、TED Talkを見て. 上手なプレゼンテーションの作り方を見て. プレゼンを作ったんですね。. だからプレゼンの背景は黒。. 白は光って読みにくいから黒にして. で、字はちょっと灰色。. 真っ白だとちょっとまぶしいから黒い背景に白い字。. で、一ページに写真を一枚だけ。. 文字はほとんど入れないで. プレゼンテーションを作ったんですよ。. そしたらやっぱり大学の論文の発表って. なんかTED Talkと違って. もっとちゃんとしているんですよね。. 最初から何を話すか目次とかをちゃんと書いたりとか. 発表の、プレゼンテーションの下の方に. 本の名前とかも全部書いて. みんなすごいめちゃめちゃ読むのが大変な. パワーポイントを作っていて。. でも多分それが当たり前なんですよね。. だから、私のパワポだけなんか. 「お前 本当に論文書いたのか？」という感じの. すごいシンプルな. 「お前何そんなカッコつけてる？」みたいな. そういう論文というか発表を. 作ってしまったことがあります。. だけど…いやでもやっぱり. わかりやすさが大切だよね。. 自分がどれだけすごいことをしたかを. 伝えるというよりも. みんなにわかりやすいように話すという方が. やっぱり大切なのかなって思います。. そう…だから私は結構発表は得意なんです。. 考えるのは苦手だけど、発表は得意。. そう だから皆さんももし、これからもし何か. 皆さんが発表をしないといけない時とかあったら. ぜひぜひ気をつけてみてください。. 四回くらい読む練習をして、文章と文章の間に. このブランクを、間を空けると. すごくカッコいいんじゃないかなと私は思っています。. わからないね。. じゃあ今日はこんな感じで終わります。. 最後まで聴いてくれてありがとうございます。. Patreonもやっているのでよかったら. Patreonでサポートしてくれるとすごく嬉しいです。. 月に四ドルで. ほとんどのエピソードのトランスクリプトが読めます。. それは&amp;quot; Japanese.IO &amp;quot;という. ウェブサイトで書いていて. ふりがなもワンクリックで付けられるし. あとは英語の意味も単語をクリックすると. すぐ調べられます、出てきます。. で、Japanese IOはChromeの. Extensionでも使えるんですよね。. だから皆さんもぜひ使ってみてください。. じゃあ今日はここまでです。. いつもありがとう、よい一日を！. またね、バイバイ！	Education	iv7FuJUBe6RtfuVIUhyb	633	0	\N	ja	a6eaa25e-5531-4168-b178-7b1b35c5d9bd	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	310 上手なプレゼンテーションの方法！😉	N5
e43e388c-a728-4b53-b4c3-49f8adaf3434	2025-03-21 15:49:51.443987	2025-03-21 15:42:58.352552	https://www.youtube.com/watch?v=23M9p7XetA4&list=TLGGnfPlGjkskXYyMTAzMjAyNQ	https://i.ytimg.com/vi/23M9p7XetA4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGE8gVChlMA8=&rs=AOn4CLDB5a3CiYvIiRWp3fgPWbBrUbHx8Q	. 진심으로 도와주기. [음악]. me2 으. 으. 왜. 타만 의 기회도 아무도 없잖아. 하 갱 이렇게 날씨가 좋은데 누가. 집에 있겠어 가려 어딘가 노려 며. 갔겠지 9 좋게 까. 이 좋았어. 아빠 1월 여보세요 아 뭐야 5일. 케어로 와 특히 날씨가 너무 귀여운. 거예요 으 얼굴 거움을 모처럼 날씨도. 찬데 방구석에 망 있게 나 타짜 나요. 그릇에 바하마 뭐라도 아깝지 않은데. 좌우 오빠 그러지 말고 우리 놀러. 나가요 지금같은 대로 백화점 하면. 창문이 없어서 비가 얻어 놓은 요도나. 시 랑 산과 몹쓸 텅 알 아이 격이. 그런 동물 같아요 턱이 라 한달 더. 무 라는 사람이 많아서 고생을 하다. 고 기뻐한 걸 알 이런날은 집에서. 테잎 입어야 빈둥거리고 최고 다음. 거의 정 심심하면 한 데 없더라 좀. 보렴 됐어요 어째 b 아무래도 안. 데려가고 는 게으른 아빠의 어깨를 줄. 몰라서 뭐 되요. 그. 하루 거기 하라고 하기. 뭐 왜 뭐 보고 계세요 움 a 거구나. 실은 지금 막 옷장 정리를 시작했다. 따 언니는 말씨가 해줘서 참 수학. 2교 큰 아 이럴수가. 모처럼 할아버지랑 산책 가려고 했는데. 그것 좀 하셨구나. 그렇지 멀고 니가 도와주면 빨리. 끝나서 산책을 나갈 수 있지 않게 미. 꽤. 아 그의 그냥 나중에 해야 되 게 요. 아이 중 크림의 2가에 모르고. 뭐야 할아버지가 안개 당의. 뭐 어쩔 수 없기에 언니랑 카드 게임. 이나 하는 수밖에 가드 게임 무. 땅처럼 찾아가 나 여태까지 엄마를. 도와서 보험 위로하고 왔단 말야. 지금부터 심해서 혼자 즐길 거야. 히 계획해 사기나 쳐다 볼 거면서. 나를 코너도 놀 생각을 하지 말고. 어디 러진 방이라도 치우는 게 어떠니. 줘 아 의해 이렇게 더러운 방에. 갑자기 친구들이 라도 오늘 어떡할. 거야. 최근 한번 꺼내면 그대로 방구석에 과. 저도 아무데서나 먹고 장난감 은 또. 어느 또 잔소리에 안 소리 안에. 생겼어 너에겐 정말 걸작을 어 이리와. 버려요. 엄마가 내 풀어내 컬러 바하리야. 후 리스. 미안 하지만 간장 좀 세워 겠니. 예. 강정은 무거워서 쉬운 돼. 그치만 엄마는 자리를 비울 수가. 없잖아. 그러면은 일을 시키면 되잖아요 어느. 조금 전까지 아침 설거지를 했단. 말이야. 이번엔 니가 신부로 말 차례야. 심부름은 정말 귀찮은 일 해상에는. 가족들을 위해 몇 킬로나 걸어서 물을. 길어 오거나 함정 일반 일에 시달리는. 불쌍한 아이들도 있는데 뭐가 괜찮아. 어쩌다 한번 심부름 하며 투덜 대담. 큰코 다 질 줄 알아. 말은 그렇게 번지르르하게 해보고 설마. 하게나 심부름 간 사이에 낮잠 이라도. 차례는 건 아니겠죠. [박수]. 모처럼 에 일요일인데 엄마의 간장. 심부름이나 해야할. 학령. 마르크 가게를 돕고 있구나 음. 엄마가 배자를 하셨거든 5 처럼 a. 루 일인데 가게 촌 소랑 2 너도. 나처럼 안됐다 뭐. 아. 특집 하다가. 그런데 이 꽃은 이름이 뭐야 그건. 불이 지어야 향기가 좋아서 향수로 도. 만들고 4. 그런거 꽃은 저건 또 그 옛날에. 약초로 쓰여 때 으. [음악]. 실은 민들레 나 국화도 약 제 2권에. 크루 코마 그러고 보니 넌 꽃박스. 상인의 아냐 지 그 정도는 저기에. 전화로 국화를 주문했었는데. r&amp;amp;d 오셨으면. 잠시만 기다리세요. 음 여기 3,000원 입니다. 그래 고맙구나. 고맙습니다 그럼 다음에 또 자야. 구조 9분이 진짜 카게 종업원 걸까. 4. 아그야 여긴 진짜 고가교 니까. 당연하지. [음악]. 아무리 봐도 진짜 좀 오버가 따 qt. 가게를 도와주면 흉터 베 반란군 아. 아 물론 받을 때도 있지만 난 그냥. 돕는게 좋은것. 업힌 줄게요. 이정도는 괜찮아 네. 놓고 전에 많구나. 아직 나랑 같은 오리 나인데 내가. 좋아서 하는 일인 걸 난 괜찮아. 5회 좋은데 다른 사람을 도와주면. 좋은노래 상기 받은. [음악]. 마다 아. 알겠습니다 그럼 멜 베라를 드릴께요. 네 감사합니다. 어서 오렴. 간식으로 과자 만들어 놨으니까 먹으렴. 으. 엄마 점심 안 드셨어요. 아 좀처럼 밥먹을 시간이 나지 않지. 보니의 요구 염을 안되요. 나도 도우 되니까 우선 식사부터. 하세요 네 엄마 1 그래 그래 아들. 니 말대로 할게. 우찌 비랑 게 알고 보는데 바쁘거든. 아침엔 물건을 두려워 야 하고 배달. 돼야 두고 5. 전화 주문을 받거나 꽃을 손질해. 하니까. 그래서 내가 조금이라도 도와 드려야. 엄마랑 같이 느긋하게 식사를 하거나. 얘기라는 시간이 생기고 4. 그게 좋아서 가게 일을 돕는 것. 뿐이야 후 좋구나. 아무리 생각해도 던 정말 모범적인 착. 품 이 야 그러나 도돌 폰 밭으로 칼. 킹 군단 특별한거 없는데. 엄마 왔다. [음악]. oi. 어서 새 엄만 방영하게 요 아 오 나. 마 루 컸구나 안녕 엄마 반전의. 아주머니께서 국화를 찾으러 오셨어요. 국악 값이 아 고맙구나 k5 무 괜찮. 님. 암것도 안 해요 이 정도 주문할. 그렇겠지. 아. [음악]. a. 그렇지 참 맛있는 과자 있는데 이게. 말고 너도 들어가서 먹고 가려고 왜. 랑 알고 치면 괜찮은게 그러지 말고. 무엇보다 말 거야 해 남 그만 가봐야. 해 이게 배 도매 다 사실은 꽤 바쁜. 오오미 것 은 n 그렇구나 아. 어쨌든 힘에서 강요 우리가 열심히 줘. 하랴. 2. dwr. [음악]. 펴 왔어야. 어. 코드가 하셨지 마르고. 언제 옮겨야 판금 왔어요 근데 엄마. 너 어디 있어요 좀전에 뭔가를 가지고. 나왔는데 왜. 근데 저는 하루 거지 아주 옷장. 정리가 끝나지 않았으면 저도 있게. 해야 그 일이라면 아까 끝나 딴다. 기다리느라 지루했지만 자 이제 산책. 가졌구나 상 책은 됐어요 왜 그. 것보다 뭔가 도와드릴 일이 없을까요. 이게 마커를 믿고 마이 많아 해야 뭐. 도와줄 일이라고 꼬추 먼 거 업적이. 생각해 내리니 이것 첨 치 음 5. 음 알고만 내몸 아 뭐 나중에. 생각나면 말씀해주세요. 그동안 전 방 청소나 하고 있을. 테니까요 아 대답이 예 y. 아 울 솟아 청소한 거야. 이따가 요시코가 놀러 오기로 했거든. 너무 더러워서 참수 해 줘. 모처럼 청소에 마음에 들었는데 벌써. 해치워 강 의. 그건 그런 병에 내가 모터 오일 게. 없을까. 뭐든지 돌 테니까 말해봐 뭐. 그렇게 돕고 싶으면 이 방송 당첨 1. 니가 있으면 원래대로 엄마 함께 고. 말 테니까 4. 아 뭐야 그렇게 심하게 말할 것까진. 5 별알 꽃. 거참 코치 켜기 약 아. 뭐 이래요 아 아. 오줌 솜. 흘러간 세상에 파는 사람이 라니까. 우리가 할 말은 아닌 것 같은데. 주문을 하고 나니. [음악]. 아 잘게요 기분좋게 와봐. [음악]. 으. 거야. cowon a5. 으 으. 아 참고하셔요 코넛 왔다. 그래 집이 있었구나 있자나요 아마. 제가 도와드릴 일 없어요 진심으로. 말을 도와드리고 싶어서 그래요 뭐 또. 우리 앞으 거 아냐 엄마는 그의 우리. 돌보느라 바쁜 시장 하여 그러니까. 개가 도와 비급을 좀 트랙이 않겠어요. 아이구 요구 좋지만 어느 내일은 해가. 서쪽에서 뜨려 오너 그러지 말고 또. 피해주세요. 5. 뭐든 좋으니까 말해 볼게요. 음. 자 그럼 저녁 준비를 도와 줍니다. 진짜죠. cook 이 병의 간장을 옮겨다 무료. 4. a 예. 으 어 엄마 한잔 없는데요 당연하지. 그래서 너한테 사오라고 그랬잖아. [음악]. 너 술 말. 까맣게 이겨 버렸어요 아예. 노르 는 청말 난생 첨 다른 사람들도. 비해 발 벗고 나서 봤지만 접근 부터. 딛고 만 가여운 마르코 였다고 볼. 수록 잘 하고 있습니다. 아. [음악]	Film & Animation	jf5luZUBe6RtfuVIfhwU	611	0	\N	kr	a6eaa25e-5531-4168-b178-7b1b35c5d9bd	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	​마루코는 아홉 살 #709 진심으로 도와주기	TOPIK2
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: noted_vocabularies; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.noted_vocabularies (id, created_at, updated_at, text, translated_text, lesson_id, created_by) FROM stdin;
9ce1f2c8-1895-4cee-a58b-eff0f192176f	2025-03-21 16:46:19.299408	2025-03-21 16:46:19.299408	string	string	11d837c1-52c3-4c94-a1c4-3ad7977beeb0	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
2ca6b8bf-124b-4c2b-996b-e35477dd87d2	2025-03-21 16:46:25.122181	2025-03-21 16:46:25.122181	string	string	11d837c1-52c3-4c94-a1c4-3ad7977beeb0	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
53780157-c7c9-45f0-ae33-8295c48bd0a8	2025-03-21 16:51:24.966323	2025-03-21 16:49:13.674847	string33	string33	11d837c1-52c3-4c94-a1c4-3ad7977beeb0	fec6fc87-cc63-4fb8-9f06-4e51a5c209b5
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.notes (id, created_at, updated_at, title, status, created_by) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.projects (id, created_at, updated_at, title, "desc", started_at, ended_at, workspace_id) FROM stdin;
\.


--
-- Data for Name: question_choices; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.question_choices (id, created_at, updated_at, content, option, question_id) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.questions (id, created_at, updated_at, title, answer, exam_part_id) FROM stdin;
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.quizzes (id, created_at, updated_at, question, choices, answer, lesson_id) FROM stdin;
72868994-ea6f-4869-933b-463689faded0	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What does 「皆さんこんにちは」mean?	Good evening, everyone|Hello everyone|Goodbye everyone|How are you, everyone?	B	e5453351-57b0-437e-ae15-a89228f01437
62254aa0-32e6-4bcd-9c08-0a7ecaacba9f	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What part of speech is 「元気」in the sentence 「元気ですか？」	Verb|Adjective (specifically a na-adjective)|Noun|Adverb	B	e5453351-57b0-437e-ae15-a89228f01437
5cba96e7-2b8c-4dab-a0c5-8f6d3a087d69	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What does 「やっと」mean in the sentence 「やっとちょっと暖かくなってきました」?	Quickly|Suddenly|Finally|Gradually	C	e5453351-57b0-437e-ae15-a89228f01437
1a869ee5-622b-4ef0-a7b2-48990d69af6a	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What tense is implied by 「〜てきた」 in 「暖かくなってきました」?	Past tense|Present tense|Future tense|A change that has started and continues to the present	D	e5453351-57b0-437e-ae15-a89228f01437
4a573a91-bbee-4469-bb83-fa69a1c07a29	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What does 「〜に比べて」 mean in 「2月に比べたら」?	In addition to February|Because of February|Compared to February|Until February	C	e5453351-57b0-437e-ae15-a89228f01437
c360d687-f936-4b86-9573-ba5a3a3bbd5a	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What does 「イケメン」 mean in current slang, according to the speaker?	A handsome man|Only a physically attractive man|Someone (including women) who is cool, reliable, and dependable|Someone who is fashionable	C	e5453351-57b0-437e-ae15-a89228f01437
c3749c89-1001-4c3e-8db9-7c77e73e772f	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	In what situations can you use the word 「イケメン」, now?	When describing someone's physical.|When you want to describe that a girl looks handsome.|When the thing(s) someone do is cool, reliable, and dependable|All of the above	D	e5453351-57b0-437e-ae15-a89228f01437
c10dd6c7-b00e-46b5-8fd1-0b1edd913855	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What does 「役に立ったら」mean?	If this is boring|If this is useful|If you are happy|If you are tired.	B	e5453351-57b0-437e-ae15-a89228f01437
8f58e911-4641-4415-b022-e2d8023a049c	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What is offered on Patreon, according to the speaker?	Japanese transcripts|Word lists|Member-only episodes|All of the above	D	e5453351-57b0-437e-ae15-a89228f01437
5fa1b63b-5ec5-4698-ad59-7a190f01b482	2025-03-18 14:11:56.63838	2025-03-18 14:11:56.63838	What is the general topic of the podcast/speech passage?	An introduction and a discussion about the end of Japanese winter|How to travel to Japan|How to dress in Japanese style|How to learn the word 'Ikemen'	A	e5453351-57b0-437e-ae15-a89228f01437
598ba9f0-f926-4222-a54c-f1c23d592966	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	다음 중 '모처럼'과 비슷한 뜻을 가진 단어는?	자주|항상|늘|오랜만에	D	e43e388c-a728-4b53-b4c3-49f8adaf3434
bc997327-34b4-456f-9a21-e889634f7d94	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	'어깨를 주무르다'에서 '주무르다'의 의미는?	때리다|손으로 누르고 문지르다|긁다|잡아당기다	B	e43e388c-a728-4b53-b4c3-49f8adaf3434
f170e3a3-72fa-4d6c-9f46-2c5f31bd18e7	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	이 글에서 '빈둥거리다'는 표현은 어떤 행동을 나타내는가?	열심히 일하다|아무 일도 하지 않고 게으름을 피우다|운동을 하다|공부를 하다	B	e43e388c-a728-4b53-b4c3-49f8adaf3434
d28c3749-4e3f-4277-a95b-074e3b7239ef	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	다음 중 '까맣게 잊어버리다'와 가장 비슷한 표현은?	희미하게 기억하다|완전히 잊다|생생하게 기억하다|잠깐 잊다	B	e43e388c-a728-4b53-b4c3-49f8adaf3434
93cdf5c3-9428-4f07-907e-7201b96d60d9	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「発表」の意味は何ですか？	こんにちは|プレゼンテーション|バイバイ|元気	B	f21efbd6-053c-4ae8-b35b-7e209aca8143
23270c7f-68d1-4f9a-ab95-89748fba7553	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「修士課程」は何を意味しますか?	高校|大学|Master's course|小学校	C	f21efbd6-053c-4ae8-b35b-7e209aca8143
2f0c3115-f70c-46fd-b77d-6aec0299ddd4	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「ふりがな」は、何のために使われますか？	英語の意味を調べる|漢字の読み方を示す|文章を書く|ウェブサイトを作る	B	f21efbd6-053c-4ae8-b35b-7e209aca8143
ba9b528b-d555-4724-ac0f-df7d625033cc	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「レジュメ」とは何ですか？	大学|論文|発表のために準備する原稿や資料|九月	C	f21efbd6-053c-4ae8-b35b-7e209aca8143
4c60f498-e5e3-4ee6-8c9f-6a6096a0d2a6	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「Japanese IO」は何のextensionとして使えますか？	Safari|Firefox|Chrome|Edge	C	f21efbd6-053c-4ae8-b35b-7e209aca8143
9b8cbf6a-8500-4af4-9111-48a339d49a23	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「…修士課程(Master &amp; の事？」みたいになるから」の省略されている部分は？	コース|プログラム|ディグリー|スクール	A	f21efbd6-053c-4ae8-b35b-7e209aca8143
920f0007-22a3-4be6-83bf-69f4b0af1117	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	発表の練習は何回ぐらいするのがよいと言っていますか？	一回|二回|三回|四回とか五回	D	f21efbd6-053c-4ae8-b35b-7e209aca8143
c98b45d0-0c35-4389-aa52-358729aa343a	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「ワンクリック」とはどういう意味ですか。	たくさんクリックする|一回クリックする|右クリック|ダブルクリック	B	f21efbd6-053c-4ae8-b35b-7e209aca8143
02cb0b79-891b-4ef5-b278-8b5e4f2b2480	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	「気を付けて」はどういう意味ですか？	注意して|心配して|楽しんで|急いで	A	f21efbd6-053c-4ae8-b35b-7e209aca8143
902d63d9-b5ca-4970-afeb-9c4f2ddfda19	2025-03-21 12:50:57.609877	2025-03-21 12:50:57.609877	文法問題：「昨日発表が終わって、論文が終わりました。」この文で使われている文法ポイントは？	「と」の並列|「て」形の連続、完了|「が」の逆説|「から」の原因・理由	B	f21efbd6-053c-4ae8-b35b-7e209aca8143
021b1bc5-7f05-43df-8744-90cc064208a6	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	다음 중 '진심으로'의 뜻으로 가장 적절한 것은?	거짓으로|장난으로|마음에서 우러나와|형식적으로	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
d8d1bdb7-a9c9-42f0-844e-ce72200bc31b	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	밑줄 친 '느긋하게'와 바꿔 쓸 수 있는 말은?	급하게|바쁘게|여유롭게|정신없이	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
da5eabd2-505a-4932-986c-800612179973	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	'방구석에 망 있게'에서 '망'의 의미는?	망함(ruin)|망할(damn)|가만히|망(net)	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
c407bfdf-7755-46de-9d04-899645ffbd9b	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	다음 중 '손질하다'의 의미로 가장 적절한 것은?	망가뜨리다|버리다|다듬고 정리하다|새것으로 바꾸다	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
f9b8c664-634a-4388-b0c4-e721f7a4e60e	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	'발 벗고 나서다'는 어떤 의미인가?	소극적으로 참여하다|아무것도 하지 않다|적극적으로 돕다|도망가다	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
d6413326-e9b4-4fd2-967f-9ba6e229e75a	2025-03-21 15:46:12.591423	2025-03-21 15:46:12.591423	다음 문장에 들어갈 적절한 조사는? "엄마 __ 도와 드려야 엄마랑 같이 식사를 할 수 있다."	는|가|를|의	C	e43e388c-a728-4b53-b4c3-49f8adaf3434
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.songs (id, created_at, updated_at, title, author, duration, created_by) FROM stdin;
\.


--
-- Data for Name: sub_tasks; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.sub_tasks (id, created_at, updated_at, title, theme_color, assignees, tags, started_at, ended_at, task_id) FROM stdin;
\.


--
-- Data for Name: subtitles; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.subtitles (id, created_at, updated_at, text, duration, "offset", language, lesson_id) FROM stdin;
559a9925-dbb0-4609-b447-c9adb5fd3654	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	皆さんこんにちは！Bite size Japaneseのレイラです。	3.32	0.5	ja	e5453351-57b0-437e-ae15-a89228f01437
cfcf00a0-4715-432c-8eae-1acddf591671	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	元気ですか？今日は3月の6日ですね。	4.62	3.82	ja	e5453351-57b0-437e-ae15-a89228f01437
d251e17c-18f3-4181-bf27-dd5d391c138a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	多分皆さんがこのエピソードを聞いてるのは、来週、再来週ぐらいかなと思うんですが、元気ですか？	8.11	8.44	ja	e5453351-57b0-437e-ae15-a89228f01437
48df6d00-6e7f-4052-bf31-c0df52afa7e0	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	日本は3月になって、やっとちょっと暖かくなってきました。	6.91	16.55	ja	e5453351-57b0-437e-ae15-a89228f01437
77ad25e6-fa53-46d4-ba51-9bdfa1f66802	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	私はまだね、出かける時はコートを着てるんだけど、でもね、ほんと２月に比べたら本当に暖かくなりました。	10.3	23.46	ja	e5453351-57b0-437e-ae15-a89228f01437
3f8ecf4a-0113-4720-8e65-347e44664826	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	今年の日本の2月は急にね、ものすごく寒くなって、日本中で雪が降ったんですね。	9.14	33.76	ja	e5453351-57b0-437e-ae15-a89228f01437
8d835be3-6073-446b-ae78-c2cbd3be1b33	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、私が住んでるこの岡山の南は、全然雪は降らないんだけど、ほんとね、今年の2月はこう、	8.68	42.9	ja	e5453351-57b0-437e-ae15-a89228f01437
3edbc0e6-29a5-4c8f-8f90-521f408b9e55	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	毎日、こう、雪は積もらないけども、雪が降るみたいな感じで、本当に寒かったんですね。	8.29	51.58	ja	e5453351-57b0-437e-ae15-a89228f01437
a43b42b4-6e13-4901-81b9-f73149534cf9	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	日本の北の方ってスキーで有名ですよね。	3.51	62.05	ja	e5453351-57b0-437e-ae15-a89228f01437
bf60925d-173a-46d6-827f-a8266e5bda37	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	長野県とか新潟県とかさ、結構スキーで有名なんだけど、そういう雪がすごい積もる地域も	10.64	65.56	ja	e5453351-57b0-437e-ae15-a89228f01437
2fbb8108-0f7f-49be-a113-7b66b467aa3b	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	今年の2月はむっちゃむっちゃ雪が降ったりして、	5.17	76.2	ja	e5453351-57b0-437e-ae15-a89228f01437
0596d330-c540-49ba-a736-7d2cc4141601	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	スキーに来た観光客の人達がほんと困るぐらい大変だったそうです。	8.58	81.37	ja	e5453351-57b0-437e-ae15-a89228f01437
cbc13d3b-3c2e-45e6-8da1-53dde690f0aa	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	月になって暖かくなってきて嬉しいですね。	3.99	90.95	ja	e5453351-57b0-437e-ae15-a89228f01437
76f6a03e-48f2-45b0-bbba-8767fc727653	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、今日のエピソードでは、日本人が使うほめ言葉を紹介したいと思います。	11.85	94.94	ja	e5453351-57b0-437e-ae15-a89228f01437
816592f2-88b2-48de-99e4-d19b5c19c37a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	ほめ言葉、人をほめる時に使う言葉ですね。	5.34	106.79	ja	e5453351-57b0-437e-ae15-a89228f01437
16e267b9-7645-4801-ace8-c66aa6877611	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、まずはじゃ、人の見た目をほめる時の言葉から紹介します。	8.99	112.13	ja	e5453351-57b0-437e-ae15-a89228f01437
ef3e067f-d0cc-4288-9ed2-39caffa9876b	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	私は一応女の子なので、どちらかというと、女の子が使うほめ言葉を知ってるんだけど、まず1つ目は「目が大きい」ですね。	13.97	122.31	ja	e5453351-57b0-437e-ae15-a89228f01437
8dd40737-b5d2-4d40-b15c-908eb9f6d3ee	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「目が大きい」とか「まつげ長いね」とかね。	5.29	136.28	ja	e5453351-57b0-437e-ae15-a89228f01437
06d4730d-0c24-4d2c-9a81-e802f6a4d7f6	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	これほめ言葉なんですね。	2.11	142.05	ja	e5453351-57b0-437e-ae15-a89228f01437
d3ffc3d5-ef74-4e98-b629-8137e821c765	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「わぁレイラさん、まつ毛長いですね」とか「めっちゃ目きれいだね」とか「目が大きいね」っていうのがほめ言葉です。	10.56	144.16	ja	e5453351-57b0-437e-ae15-a89228f01437
28ec37a8-4ccb-4f69-a5c2-005c63c7d036	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	何か、やっぱね、日本の女の子は、結構目が丸くて、大きいのが好きなんですね。	8.12	154.72	ja	e5453351-57b0-437e-ae15-a89228f01437
dd5ef277-6360-4cf4-9b54-8163ee44626e	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、でも日本人ってアジア人だし、普通の人はそんなさ、目が大きくない	7.28	162.84	ja	e5453351-57b0-437e-ae15-a89228f01437
db7097c5-5148-4b8b-9d11-9c2c00ec0a19	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	どちらかと言うと、細い目をしてるんですよね。	4.23	170.12	ja	e5453351-57b0-437e-ae15-a89228f01437
31a48c40-2957-4bff-8a1e-c8f30f8210e3	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	目を開けた時に、目の上にできる線がありますよね。	6.43	174.35	ja	e5453351-57b0-437e-ae15-a89228f01437
b0d4f33e-43eb-45dc-af11-dbe0178f0b0d	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、その線がない人もいますよね。	4.68	180.78	ja	e5453351-57b0-437e-ae15-a89228f01437
4000335e-4ef2-46af-a0a8-c3ee6e706c19	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	その線がない時をない目を「一重（ひとえ）」って言います。	3.47	185.46	ja	e5453351-57b0-437e-ae15-a89228f01437
67f2206f-9a00-4961-a123-99bd77bb566f	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、目を開けた時に目の上に線ができると、これが二重（ふたえ）なんですね。	8.55	188.93	ja	e5453351-57b0-437e-ae15-a89228f01437
98c732f5-a33d-4225-bb92-51ae5a530ce2	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、特に若い女の子は二重（ふたえ）に憧れていて、	4.8	197.48	ja	e5453351-57b0-437e-ae15-a89228f01437
8f438ed4-4ce0-4f3c-b7a7-034f42b075a7	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	一重（ひとえ）の子は、目の上にね、薄いテープを貼って、目を開けた時に、この二重（ふたえ）のようなこの線ができるように	14.85	202.28	ja	e5453351-57b0-437e-ae15-a89228f01437
5ffbf8a1-d51b-4865-8a88-73540b257d8a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	メイクをしたりとかね、してる人が結構多いです。	4.8	217.13	ja	e5453351-57b0-437e-ae15-a89228f01437
39ad9e7e-0f93-4c53-a6a9-19cd916d5c38	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	私は結構どんな目も好きですね。目ってやっぱり人種によって本当に違うけど、	8.81	222.81	ja	e5453351-57b0-437e-ae15-a89228f01437
6bf18b2f-cede-41dd-917c-e6003317b005	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	特に特徴がある目って私すごい好きで、なんか、一重（ひとえ）でもやっぱ、すごいかっこいい目ってあるんですよね。	8.29	231.62	ja	e5453351-57b0-437e-ae15-a89228f01437
b02583d0-d634-4d3d-bc66-aec7fa01190a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	でも日本人はの女の子はだいたい「目が大きいね」っていうのはほめ言葉で、	9.18	239.91	ja	e5453351-57b0-437e-ae15-a89228f01437
d444ddc1-8ef7-4176-9583-8d744d9976d9	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「目が細い」とか「目が小さい」っていうのは、逆にちょっと悪口というか、そんなね、ほめ言葉としては使わないんですよね。	12.38	249.09	ja	e5453351-57b0-437e-ae15-a89228f01437
15a0ea98-7a2c-4f03-af02-ad457222e10e	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、あとは、「鼻が高い」っていうのもほめ言葉みたいに使う人がいます。	7.49	261.47	ja	e5453351-57b0-437e-ae15-a89228f01437
ead497fa-d20e-4d0e-a7c0-e8d4a30923ab	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、あとは「顔が小さい」もほめ言葉なんですね。	4.11	268.96	ja	e5453351-57b0-437e-ae15-a89228f01437
5b44ec14-8543-4a54-8549-fae528bf70fd	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	こう、顔が小さくて、足が長いモデルスーパーモデルみたいなスタイルがすごく理想的。	12.34	273.07	ja	e5453351-57b0-437e-ae15-a89228f01437
ea6ef560-822f-4ef7-9d7a-03d060289d11	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	みんなが憧れる体の形なんですよね。	5.53	285.41	ja	e5453351-57b0-437e-ae15-a89228f01437
8fa893b4-a63e-4fca-aba6-40d2c5ad99bf	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	だから、「顔、小さいね」とか、「めっちゃ足長いね」とか、「スタイルいいね」とか、	7.16	290.94	ja	e5453351-57b0-437e-ae15-a89228f01437
8d0d7eea-f4b7-4d8b-b0db-00be913fae6c	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「細いね」っていうのは、ほんと、ほめ言葉として特にね女の子たちはよく使います。	10.28	298.1	ja	e5453351-57b0-437e-ae15-a89228f01437
d7b004c7-8d06-42e5-a7e1-4de00e45a3f1	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、男の子に使うほめ言葉は、私あんまり思いつかないんだけど、「イケメン」とか「かっこいい」ですよね。	12.09	308.67	ja	e5453351-57b0-437e-ae15-a89228f01437
56dbbd0b-07f0-4858-8765-54274dc191f3	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、最近は「イケメン」とか言う言葉を、女の子にも使ったりする。	7.58	321.77	ja	e5453351-57b0-437e-ae15-a89228f01437
443358f9-9dc7-49c5-812f-1eba26fe5d7a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	その女の子の中でも何かこう、他の友達を守ってくれるような女の子もいますよね。	10.05	329.35	ja	e5453351-57b0-437e-ae15-a89228f01437
0d7d4b35-ec30-4a1a-a3e5-71d29afeb41b	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	すごくしっかりしてて、みんなが頼れるような女の子を結構、「イケメン」、	8.59	339.4	ja	e5453351-57b0-437e-ae15-a89228f01437
36ac4a19-a285-4c7b-9ff1-61cd535233e6	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	なんか、すごい頼れるっていうような女の子に、「めっちゃイケメン」とか言うこともあります。	8.1	347.99	ja	e5453351-57b0-437e-ae15-a89228f01437
b5b0fb0d-50d6-4dcc-a713-d9e72a4fecf9	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	はい、イケメンはなのでほめ言葉ですね。	4.37	356.43	ja	e5453351-57b0-437e-ae15-a89228f01437
394f3ceb-36b7-40ac-9537-99418947a516	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	見た目だけじゃなくて、その人のやってることがかっこいいみたいな時に「イケメン」って使うこともよくあります。	10.72	360.8	ja	e5453351-57b0-437e-ae15-a89228f01437
1bb53b80-c9c7-4ddf-bd2e-9a13a0e1ceeb	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	じゃあ次は、仕事で使う職場で使うほめ言葉ね。	6.29	373.58	ja	e5453351-57b0-437e-ae15-a89228f01437
57c9e3a8-c180-49de-8270-64855fea2ff1	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	まあ、いろいろあるんだけど、やっぱり「仕事が早い」、「仕事が早い」とか	7.92	379.87	ja	e5453351-57b0-437e-ae15-a89228f01437
36371bbf-2368-4a84-8f2c-c1bdcaef327a	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「れいらさん、すごい仕事早いですね」とか、あと「頭いいですね\n」とかね。	6.15	387.79	ja	e5453351-57b0-437e-ae15-a89228f01437
30ec34d9-9878-464f-9acc-4361a132f02c	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	これはすごいほめ言葉ね。あと、「さすがれいらさん、れいらさんはさすがですね。」	5.4	393.94	ja	e5453351-57b0-437e-ae15-a89228f01437
b0e0f7be-34f7-46dc-a62b-54d307ca6bdc	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「すごいですね」とか、「ほんと頼りになります。」	4.56	399.34	ja	e5453351-57b0-437e-ae15-a89228f01437
ecc61d79-53d0-4c92-bd70-742ae38775ec	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「頼りになります」とか、あと、「センスいいですね」もよく使いますね。	6.54	403.9	ja	e5453351-57b0-437e-ae15-a89228f01437
3cb033af-5125-42b8-8fdc-cc51c2282f38	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	センスって、よくファッションセンスがいい人、すごくおしゃれができる人にもセンスがいいですねって言うんだけど	10.38	410.44	ja	e5453351-57b0-437e-ae15-a89228f01437
79cec168-64fd-4c09-8790-6e9cc7529285	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	このセンスっていう言葉は、ファッションとかだけじゃなくて、こう、人が、	7.77	420.82	ja	e5453351-57b0-437e-ae15-a89228f01437
3c8fa172-3be8-49fd-b603-20c25c1e9b1c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「発表」＝プレゼンテーション	2.52	9.61	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
83fafc37-70ef-4971-bb0e-ea63922dc200	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	他の人が考えられないようなものを組み合わせて、新しい、カッコいいものを作れたりする人も時々いますよね。	10.94	428.59	ja	e5453351-57b0-437e-ae15-a89228f01437
61568ed9-8111-4dee-b9a8-c62dea2e43e0	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、そういう人を「センスがいい」って言ったりすることもあります。	5.29	439.53	ja	e5453351-57b0-437e-ae15-a89228f01437
d54346ef-73f1-4923-926e-6593574412ef	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	すごくいいほめ言葉ですよね。	5.12	444.82	ja	e5453351-57b0-437e-ae15-a89228f01437
2fdc734a-1f10-4a76-bf68-135ef40f834e	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、皆さんも知っていると思うけど、日本人ってだいたいほめられたら、	7.54	450.36	ja	e5453351-57b0-437e-ae15-a89228f01437
ba243858-fc7d-4797-8aec-1ce9cf598fd6	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「いえいえいえいえ....」「全然全然全然」みたいな	5.17	457.9	ja	e5453351-57b0-437e-ae15-a89228f01437
cb3b2b27-89ba-4fc4-a8c9-0c75cf3f5829	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	ほめられても、何かそれを認めるような返事はしない人がやっぱり多いですよね。	9.25	463.07	ja	e5453351-57b0-437e-ae15-a89228f01437
ce41f0e9-a056-471a-aa40-24c5f1eeadaf	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「いやいた」「いえいえ」「いや、そんなことないです」っていうのが一番よくある返事のし方で、	8.83	472.32	ja	e5453351-57b0-437e-ae15-a89228f01437
015b8fd9-8867-470f-a046-94f4f22c724d	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	私もほめられたらやっぱり「いやいやいや」ってどうしても言ってしまう。	6.06	481.15	ja	e5453351-57b0-437e-ae15-a89228f01437
8127503e-9e10-4d61-8352-bb9e06adeaa7	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	でも、ほめられた時に、冗談っぽく、冗談を言ってるみたいに	5.78	487.21	ja	e5453351-57b0-437e-ae15-a89228f01437
ca854be0-179a-469f-b085-fd6b19ad90d9	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「れいらさん」仕事早いですねっって言われたら、「ですよね笑」みたいな「でしょう？笑」みたいな、何か笑いながら、冗談っぽく「そうでしょう？笑」みたいな言う人も結構いる。	16.49	492.99	ja	e5453351-57b0-437e-ae15-a89228f01437
445e2b4e-a872-4a8a-bc5f-e4e7db12f647	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	で、それってすごく楽しい返事だと思います。	4.5	509.48	ja	e5453351-57b0-437e-ae15-a89228f01437
cf1e336f-1c97-42df-b3d1-0fa91cd77adc	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	自分を「いや、そんなことない」って下に言う必要もなくて、冗談を言って楽しく、笑いに変えるみたいな感じの答え方で、私は結構好きです。	14.91	513.98	ja	e5453351-57b0-437e-ae15-a89228f01437
6a9af823-63e8-4c3f-b6c5-ddba4c7077b5	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	あとは普通に「れいらさん仕事早いですね」って言われたら「ええ、そうかな？ありがとうございます」みたいな。	11.5	528.89	ja	e5453351-57b0-437e-ae15-a89228f01437
8b3b2fe2-a40b-4f0e-81a3-f67923676b5f	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「本当ですか？嬉しいです！ありがとうございます！」みたいに、素直に	7.84	540.39	ja	e5453351-57b0-437e-ae15-a89228f01437
3da26c94-6747-47bd-8913-e3e1318ff590	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「本当ですか？」って聞きながらも「ありがとうございます。嬉しいです。」っていう言葉も一緒に言うと、それもすごくいい返事のし方ですよね。	16.32	548.23	ja	e5453351-57b0-437e-ae15-a89228f01437
44a6d17e-9b88-4ae6-8c76-1a226ffbabc3	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	なんかさ、人をほめてあげても、その人が「いやいやいやいやいや」ってすごい申し訳ない感じになっちゃったら楽しくないんだけど	8.81	564.55	ja	e5453351-57b0-437e-ae15-a89228f01437
47ca2989-ba02-4241-af1d-c8183819b266	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	人をほめた時にその人が「嬉しいです！ありがとうございます！」って言ってくれたり、	5.76	573.36	ja	e5453351-57b0-437e-ae15-a89228f01437
126ed389-b9cb-40b7-a4de-fa0e730f8650	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	「そうでしょう笑」みたいな、ハハハって冗談を言ってくれたりすると、空気が、雰囲気が、その場所が、なんか明るくなっていいなと思います。	15.58	579.12	ja	e5453351-57b0-437e-ae15-a89228f01437
7e73d31f-6946-4e36-86d4-7850b7235b92	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	こんな感じ。	1.2	596.79	ja	e5453351-57b0-437e-ae15-a89228f01437
7baf2613-466d-4564-9ce8-6a15261ceb7c	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	日本人がよく使うほめ言葉ですね。	3.42	597.99	ja	e5453351-57b0-437e-ae15-a89228f01437
347bf7e6-5c46-4c4b-a4e1-804f71a65750	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	皆さんもね、ぜひ使ってみてください。	2.72	601.41	ja	e5453351-57b0-437e-ae15-a89228f01437
e8c3e041-c6b7-4d57-b88d-2c178596fb78	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	はい、ありがとうございます、最後まで聞いてくれて。	3.77	605.74	ja	e5453351-57b0-437e-ae15-a89228f01437
81f6941a-029e-4b5c-a074-c1dcdbc9d868	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	もしね、このポッドキャスト役に立ったら、メンバーシップのPatreonに入ってくれるとすごく嬉しいです。	7.62	609.51	ja	e5453351-57b0-437e-ae15-a89228f01437
c156c269-3fa4-4472-8cae-1d1a6adedad5	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	Patreonでは、日本語のトランスクリプトとか、単語のリストとか、あとメンバーのエピソードもあるので、	9.17	617.13	ja	e5453351-57b0-437e-ae15-a89228f01437
7dfb27c0-13e7-4af9-87aa-3b83b91b9155	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	ぜひね、興味がある人はメンバーになってくれると嬉しいです。	4.78	626.3	ja	e5453351-57b0-437e-ae15-a89228f01437
50c33748-a352-4a4d-90e5-83e68f625199	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	じゃあ今日はこんな感じで終わります。	2.73	632.14	ja	e5453351-57b0-437e-ae15-a89228f01437
8dd8dc90-a32b-45fb-8ab9-c04094be06a0	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	皆さんお疲れ様でした。	2.32	634.87	ja	e5453351-57b0-437e-ae15-a89228f01437
45943735-7a38-47d4-a897-4feba125e3bc	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	じゃあね！	0.82	637.19	ja	e5453351-57b0-437e-ae15-a89228f01437
03efdcce-d821-4d2b-ad44-14364e62fb93	2025-03-18 14:08:26.40516	2025-03-18 14:08:26.40516	バイバイ！	0.49	638.01	ja	e5453351-57b0-437e-ae15-a89228f01437
a077ece5-e1c8-432f-9899-02619d93256f	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	皆さんこんにちは！Bite size Japaneseのレイラです。	3.32	0.5	ja	e5453351-57b0-437e-ae15-a89228f01437
bbb60e2b-386c-4679-8863-d93e1c714135	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	元気ですか？今日は3月の6日ですね。	4.62	3.82	ja	e5453351-57b0-437e-ae15-a89228f01437
af15d3fa-bef3-4241-86f6-5935db3dd5ff	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	多分皆さんがこのエピソードを聞いてるのは、来週、再来週ぐらいかなと思うんですが、元気ですか？	8.11	8.44	ja	e5453351-57b0-437e-ae15-a89228f01437
19a4f72c-c6b3-4681-bdff-2be642c554cf	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	日本は3月になって、やっとちょっと暖かくなってきました。	6.91	16.55	ja	e5453351-57b0-437e-ae15-a89228f01437
e5f2c4c3-ebd2-4277-a294-eb170491c160	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	私はまだね、出かける時はコートを着てるんだけど、でもね、ほんと２月に比べたら本当に暖かくなりました。	10.3	23.46	ja	e5453351-57b0-437e-ae15-a89228f01437
0e4e1bbd-7fa6-4794-a2d8-e2e2b91ccd05	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	今年の日本の2月は急にね、ものすごく寒くなって、日本中で雪が降ったんですね。	9.14	33.76	ja	e5453351-57b0-437e-ae15-a89228f01437
8c0af27f-acd3-47f4-87c8-53d2c05e2a0e	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、私が住んでるこの岡山の南は、全然雪は降らないんだけど、ほんとね、今年の2月はこう、	8.68	42.9	ja	e5453351-57b0-437e-ae15-a89228f01437
30cf594b-7273-4e78-9649-0e176e0f8b49	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	毎日、こう、雪は積もらないけども、雪が降るみたいな感じで、本当に寒かったんですね。	8.29	51.58	ja	e5453351-57b0-437e-ae15-a89228f01437
91e7ea02-6fbc-48e7-b452-3d6f26ea0076	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	日本の北の方ってスキーで有名ですよね。	3.51	62.05	ja	e5453351-57b0-437e-ae15-a89228f01437
29156f48-83fb-4f67-9525-875a35c7a581	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	昨日私、大学の論文の発表があったんですね。	6.03	12.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
8b04e377-e8dc-49f3-95cb-e2cae2a6f74f	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	長野県とか新潟県とかさ、結構スキーで有名なんだけど、そういう雪がすごい積もる地域も	10.64	65.56	ja	e5453351-57b0-437e-ae15-a89228f01437
c3bb07be-6d21-4774-9704-cadbc2349c39	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	今年の2月はむっちゃむっちゃ雪が降ったりして、	5.17	76.2	ja	e5453351-57b0-437e-ae15-a89228f01437
b2ad2d62-c41a-41ef-a616-150e95dfabb4	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	スキーに来た観光客の人達がほんと困るぐらい大変だったそうです。	8.58	81.37	ja	e5453351-57b0-437e-ae15-a89228f01437
ebb12832-be86-483d-b8dd-d94b2600507d	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	月になって暖かくなってきて嬉しいですね。	3.99	90.95	ja	e5453351-57b0-437e-ae15-a89228f01437
28bef870-d703-4dff-a233-5a7dbbd2caa9	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、今日のエピソードでは、日本人が使うほめ言葉を紹介したいと思います。	11.85	94.94	ja	e5453351-57b0-437e-ae15-a89228f01437
f133a41b-33c9-4568-89df-c4f0ddc5bb49	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	ほめ言葉、人をほめる時に使う言葉ですね。	5.34	106.79	ja	e5453351-57b0-437e-ae15-a89228f01437
3ea8fa11-a46d-4134-be6e-6320bdf9ebea	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、まずはじゃ、人の見た目をほめる時の言葉から紹介します。	8.99	112.13	ja	e5453351-57b0-437e-ae15-a89228f01437
35aa7d06-103e-464f-bca1-0ad8dd2f7d3d	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	私は一応女の子なので、どちらかというと、女の子が使うほめ言葉を知ってるんだけど、まず1つ目は「目が大きい」ですね。	13.97	122.31	ja	e5453351-57b0-437e-ae15-a89228f01437
0e9bc133-8ebd-4292-b27c-f3a83746dc6e	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「目が大きい」とか「まつげ長いね」とかね。	5.29	136.28	ja	e5453351-57b0-437e-ae15-a89228f01437
71e9b4f8-6e2a-4a24-b179-cc15524169ea	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	これほめ言葉なんですね。	2.11	142.05	ja	e5453351-57b0-437e-ae15-a89228f01437
8aeda366-ac1e-4d97-81d3-5a8b33b549c3	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「わぁレイラさん、まつ毛長いですね」とか「めっちゃ目きれいだね」とか「目が大きいね」っていうのがほめ言葉です。	10.56	144.16	ja	e5453351-57b0-437e-ae15-a89228f01437
58c081b1-1feb-45c3-94fe-793356d372a8	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	何か、やっぱね、日本の女の子は、結構目が丸くて、大きいのが好きなんですね。	8.12	154.72	ja	e5453351-57b0-437e-ae15-a89228f01437
514df5d1-7a3e-4945-8740-b0d8ba530f95	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、でも日本人ってアジア人だし、普通の人はそんなさ、目が大きくない	7.28	162.84	ja	e5453351-57b0-437e-ae15-a89228f01437
d813cb65-c5c3-483a-abfd-364f82ef64ba	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	どちらかと言うと、細い目をしてるんですよね。	4.23	170.12	ja	e5453351-57b0-437e-ae15-a89228f01437
1143e2f1-9f8d-4bd8-92ba-996f0c5804db	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	目を開けた時に、目の上にできる線がありますよね。	6.43	174.35	ja	e5453351-57b0-437e-ae15-a89228f01437
e420fef1-7744-479c-8c44-d0c89028e5eb	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、その線がない人もいますよね。	4.68	180.78	ja	e5453351-57b0-437e-ae15-a89228f01437
fc0f78e5-a634-496d-8f9e-7f67120f4fee	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	その線がない時をない目を「一重（ひとえ）」って言います。	3.47	185.46	ja	e5453351-57b0-437e-ae15-a89228f01437
d5580154-5073-478e-a99d-24d5c1ca2d9a	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、目を開けた時に目の上に線ができると、これが二重（ふたえ）なんですね。	8.55	188.93	ja	e5453351-57b0-437e-ae15-a89228f01437
97920bdf-ebd0-4e13-b75d-6ce8a4f7d949	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、特に若い女の子は二重（ふたえ）に憧れていて、	4.8	197.48	ja	e5453351-57b0-437e-ae15-a89228f01437
eed5fa34-2934-4623-bd0f-13f8e3dbe8cd	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	一重（ひとえ）の子は、目の上にね、薄いテープを貼って、目を開けた時に、この二重（ふたえ）のようなこの線ができるように	14.85	202.28	ja	e5453351-57b0-437e-ae15-a89228f01437
4346e829-a5cf-475b-831b-b52874698307	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	メイクをしたりとかね、してる人が結構多いです。	4.8	217.13	ja	e5453351-57b0-437e-ae15-a89228f01437
f3dc96b3-3527-43cc-b274-10fc10a3eb2c	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	私は結構どんな目も好きですね。目ってやっぱり人種によって本当に違うけど、	8.81	222.81	ja	e5453351-57b0-437e-ae15-a89228f01437
019fc3da-0890-459b-9019-28bbdc046772	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	特に特徴がある目って私すごい好きで、なんか、一重（ひとえ）でもやっぱ、すごいかっこいい目ってあるんですよね。	8.29	231.62	ja	e5453351-57b0-437e-ae15-a89228f01437
a1f4e083-03e5-4c2e-805b-02ddf3b6296e	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	でも日本人はの女の子はだいたい「目が大きいね」っていうのはほめ言葉で、	9.18	239.91	ja	e5453351-57b0-437e-ae15-a89228f01437
ca2b2bff-dbb8-4ca6-81a3-1168035637fa	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「目が細い」とか「目が小さい」っていうのは、逆にちょっと悪口というか、そんなね、ほめ言葉としては使わないんですよね。	12.38	249.09	ja	e5453351-57b0-437e-ae15-a89228f01437
52be70d5-bedf-4807-9f05-d4dc24014860	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、あとは、「鼻が高い」っていうのもほめ言葉みたいに使う人がいます。	7.49	261.47	ja	e5453351-57b0-437e-ae15-a89228f01437
cf8ee8fd-5399-4509-98a8-abe103db1ce9	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、あとは「顔が小さい」もほめ言葉なんですね。	4.11	268.96	ja	e5453351-57b0-437e-ae15-a89228f01437
4ed49242-2287-4995-bab9-6efa6afad31f	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	こう、顔が小さくて、足が長いモデルスーパーモデルみたいなスタイルがすごく理想的。	12.34	273.07	ja	e5453351-57b0-437e-ae15-a89228f01437
846b4b3b-b44c-471e-a8cd-da8ffa8af7f1	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	みんなが憧れる体の形なんですよね。	5.53	285.41	ja	e5453351-57b0-437e-ae15-a89228f01437
c8dd699a-8df9-444c-9109-d4916916de61	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	だから、「顔、小さいね」とか、「めっちゃ足長いね」とか、「スタイルいいね」とか、	7.16	290.94	ja	e5453351-57b0-437e-ae15-a89228f01437
2398257b-9faf-4b6c-9a79-8a0abe068c93	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「細いね」っていうのは、ほんと、ほめ言葉として特にね女の子たちはよく使います。	10.28	298.1	ja	e5453351-57b0-437e-ae15-a89228f01437
8269cf8e-fbe7-4ec0-aa0e-7b224078a329	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、男の子に使うほめ言葉は、私あんまり思いつかないんだけど、「イケメン」とか「かっこいい」ですよね。	12.09	308.67	ja	e5453351-57b0-437e-ae15-a89228f01437
5b501340-2f48-489e-be8c-aea246d5e38a	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、最近は「イケメン」とか言う言葉を、女の子にも使ったりする。	7.58	321.77	ja	e5453351-57b0-437e-ae15-a89228f01437
2fe22ae9-4cd1-4b53-ba8b-c30b5aa8bdfd	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	その女の子の中でも何かこう、他の友達を守ってくれるような女の子もいますよね。	10.05	329.35	ja	e5453351-57b0-437e-ae15-a89228f01437
afc71171-b02f-4ae2-90a0-f88e941c6a0d	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	すごくしっかりしてて、みんなが頼れるような女の子を結構、「イケメン」、	8.59	339.4	ja	e5453351-57b0-437e-ae15-a89228f01437
6ec04dde-5204-4e95-9fbf-5d9495a31d82	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	なんか、すごい頼れるっていうような女の子に、「めっちゃイケメン」とか言うこともあります。	8.1	347.99	ja	e5453351-57b0-437e-ae15-a89228f01437
3142e999-a1a0-4c98-9719-6892fc5af9ed	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	はい、イケメンはなのでほめ言葉ですね。	4.37	356.43	ja	e5453351-57b0-437e-ae15-a89228f01437
8d79e094-5d1f-48eb-83b1-0ddb1cb92e2d	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	見た目だけじゃなくて、その人のやってることがかっこいいみたいな時に「イケメン」って使うこともよくあります。	10.72	360.8	ja	e5453351-57b0-437e-ae15-a89228f01437
0641cca8-38e1-4245-99c3-660a54af6170	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	じゃあ次は、仕事で使う職場で使うほめ言葉ね。	6.29	373.58	ja	e5453351-57b0-437e-ae15-a89228f01437
6bd3147a-5817-4c68-be3d-0cdbc9f2d658	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	まあ、いろいろあるんだけど、やっぱり「仕事が早い」、「仕事が早い」とか	7.92	379.87	ja	e5453351-57b0-437e-ae15-a89228f01437
3999a934-eb24-4633-ba3e-c3d002a9ed67	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「れいらさん、すごい仕事早いですね」とか、あと「頭いいですね\n」とかね。	6.15	387.79	ja	e5453351-57b0-437e-ae15-a89228f01437
3297b199-33e3-4381-a9dc-e8467d014022	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	これはすごいほめ言葉ね。あと、「さすがれいらさん、れいらさんはさすがですね。」	5.4	393.94	ja	e5453351-57b0-437e-ae15-a89228f01437
85769cf8-bed7-4bc1-ba83-45d17c2b82b3	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「すごいですね」とか、「ほんと頼りになります。」	4.56	399.34	ja	e5453351-57b0-437e-ae15-a89228f01437
b26e29df-e5ce-41eb-8c51-5dd27f2de8df	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「頼りになります」とか、あと、「センスいいですね」もよく使いますね。	6.54	403.9	ja	e5453351-57b0-437e-ae15-a89228f01437
c13200eb-6696-4237-a201-b34b3a783388	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	センスって、よくファッションセンスがいい人、すごくおしゃれができる人にもセンスがいいですねって言うんだけど	10.38	410.44	ja	e5453351-57b0-437e-ae15-a89228f01437
fc85a9ac-1f94-41fa-a95c-d54ef16df433	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	このセンスっていう言葉は、ファッションとかだけじゃなくて、こう、人が、	7.77	420.82	ja	e5453351-57b0-437e-ae15-a89228f01437
3d127a4a-1786-4b48-8e8c-d936d96672aa	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	他の人が考えられないようなものを組み合わせて、新しい、カッコいいものを作れたりする人も時々いますよね。	10.94	428.59	ja	e5453351-57b0-437e-ae15-a89228f01437
afdb05f0-a7e7-41ec-9eaa-9ec98dd93d8c	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、そういう人を「センスがいい」って言ったりすることもあります。	5.29	439.53	ja	e5453351-57b0-437e-ae15-a89228f01437
640f7e95-7366-4fb6-9cdf-661c7bcacd16	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	すごくいいほめ言葉ですよね。	5.12	444.82	ja	e5453351-57b0-437e-ae15-a89228f01437
46b7e79b-8e7b-4928-a91f-968bf2646137	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、皆さんも知っていると思うけど、日本人ってだいたいほめられたら、	7.54	450.36	ja	e5453351-57b0-437e-ae15-a89228f01437
c68e57bd-4c26-4750-863d-165de998c4c8	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「いえいえいえいえ....」「全然全然全然」みたいな	5.17	457.9	ja	e5453351-57b0-437e-ae15-a89228f01437
11704583-3646-4386-aad8-554472864440	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	ほめられても、何かそれを認めるような返事はしない人がやっぱり多いですよね。	9.25	463.07	ja	e5453351-57b0-437e-ae15-a89228f01437
a47c9cf4-0ce6-4a8a-acc3-b8f250f3538a	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「いやいた」「いえいえ」「いや、そんなことないです」っていうのが一番よくある返事のし方で、	8.83	472.32	ja	e5453351-57b0-437e-ae15-a89228f01437
cd9fccb3-f2ca-4fd8-9d6b-f2caf3ed4766	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	私もほめられたらやっぱり「いやいやいや」ってどうしても言ってしまう。	6.06	481.15	ja	e5453351-57b0-437e-ae15-a89228f01437
ee2fe05e-d279-4be5-9ee0-773676e06dd5	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	でも、ほめられた時に、冗談っぽく、冗談を言ってるみたいに	5.78	487.21	ja	e5453351-57b0-437e-ae15-a89228f01437
e859b6a1-8b36-4eb0-aba3-8b4f1680d853	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「れいらさん」仕事早いですねっって言われたら、「ですよね笑」みたいな「でしょう？笑」みたいな、何か笑いながら、冗談っぽく「そうでしょう？笑」みたいな言う人も結構いる。	16.49	492.99	ja	e5453351-57b0-437e-ae15-a89228f01437
0cf0387d-7870-47e5-ba87-9987094b8f77	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	で、それってすごく楽しい返事だと思います。	4.5	509.48	ja	e5453351-57b0-437e-ae15-a89228f01437
72de5585-5a15-4d1c-8c82-5632fba0e3a3	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	自分を「いや、そんなことない」って下に言う必要もなくて、冗談を言って楽しく、笑いに変えるみたいな感じの答え方で、私は結構好きです。	14.91	513.98	ja	e5453351-57b0-437e-ae15-a89228f01437
71306bbb-a44c-4934-852d-d8fdad9561d7	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	あとは普通に「れいらさん仕事早いですね」って言われたら「ええ、そうかな？ありがとうございます」みたいな。	11.5	528.89	ja	e5453351-57b0-437e-ae15-a89228f01437
a4a5ec25-04fb-4511-9517-1dec069f8eef	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「本当ですか？嬉しいです！ありがとうございます！」みたいに、素直に	7.84	540.39	ja	e5453351-57b0-437e-ae15-a89228f01437
2751b35d-e4c5-4f61-a692-721b7ecf5079	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「本当ですか？」って聞きながらも「ありがとうございます。嬉しいです。」っていう言葉も一緒に言うと、それもすごくいい返事のし方ですよね。	16.32	548.23	ja	e5453351-57b0-437e-ae15-a89228f01437
e8e2f4b2-40ea-483b-a401-23e6f50e8c13	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	なんかさ、人をほめてあげても、その人が「いやいやいやいやいや」ってすごい申し訳ない感じになっちゃったら楽しくないんだけど	8.81	564.55	ja	e5453351-57b0-437e-ae15-a89228f01437
ab185389-2194-4c33-a33c-96749f81a9b4	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	人をほめた時にその人が「嬉しいです！ありがとうございます！」って言ってくれたり、	5.76	573.36	ja	e5453351-57b0-437e-ae15-a89228f01437
b088e56d-43d2-47dd-b4f1-201f05314830	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	「そうでしょう笑」みたいな、ハハハって冗談を言ってくれたりすると、空気が、雰囲気が、その場所が、なんか明るくなっていいなと思います。	15.58	579.12	ja	e5453351-57b0-437e-ae15-a89228f01437
28d9a122-4ff1-403f-8566-56bbb6a390bd	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	こんな感じ。	1.2	596.79	ja	e5453351-57b0-437e-ae15-a89228f01437
e18851aa-5470-4a9a-b5b8-8b66a1ae7f84	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	日本人がよく使うほめ言葉ですね。	3.42	597.99	ja	e5453351-57b0-437e-ae15-a89228f01437
543cb62e-30fd-4a71-9f0d-69dc542ab97d	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	皆さんもね、ぜひ使ってみてください。	2.72	601.41	ja	e5453351-57b0-437e-ae15-a89228f01437
2c62053b-e484-4d81-b1cb-5681b6a8ca89	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	はい、ありがとうございます、最後まで聞いてくれて。	3.77	605.74	ja	e5453351-57b0-437e-ae15-a89228f01437
5d60dfc4-4f85-4c09-9b1b-4d3182923428	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	もしね、このポッドキャスト役に立ったら、メンバーシップのPatreonに入ってくれるとすごく嬉しいです。	7.62	609.51	ja	e5453351-57b0-437e-ae15-a89228f01437
9ba264e4-20a4-4bc2-8b4e-c04698c469cc	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	Patreonでは、日本語のトランスクリプトとか、単語のリストとか、あとメンバーのエピソードもあるので、	9.17	617.13	ja	e5453351-57b0-437e-ae15-a89228f01437
a92f7eba-b20e-4d96-9eaf-9b2f0da333fe	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	ぜひね、興味がある人はメンバーになってくれると嬉しいです。	4.78	626.3	ja	e5453351-57b0-437e-ae15-a89228f01437
c546f534-0cfb-43e8-83d6-f301ae349a0a	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	じゃあ今日はこんな感じで終わります。	2.73	632.14	ja	e5453351-57b0-437e-ae15-a89228f01437
6a0a9dae-45f3-4cb8-9b2b-7e187f9fce42	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	皆さんお疲れ様でした。	2.32	634.87	ja	e5453351-57b0-437e-ae15-a89228f01437
eb08ed2f-10c2-466e-9c7f-1f18ac04b2db	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	じゃあね！	0.82	637.19	ja	e5453351-57b0-437e-ae15-a89228f01437
45dc035f-fa68-4182-ada4-6d061cdb0404	2025-03-18 14:10:25.27013	2025-03-18 14:10:25.27013	バイバイ！	0.49	638.01	ja	e5453351-57b0-437e-ae15-a89228f01437
8c76b3f0-162f-43fb-aa2c-fcdfaaad9727	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	はい皆さん、こんにちは。	1.53	0.16	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ed7269b1-0eb9-44bf-9168-c137d5869230	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	Bite size Japaneseのレイラです。	2.33	1.69	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f7309238-7ed7-4b11-a9c2-bcbc6c620d27	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	元気ですか？	1.5	4.02	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a81a745e-0c55-413e-9537-7695d35a1dc8	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	今日は発表の話をしたいと思います。	3.41	6.2	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
e006eda9-472d-4272-9b62-c399ff24316c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	終わりました。	0.81	18.16	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
41e540c8-a7be-45f7-933a-2ee0fc17da8b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	最近ずっと論文で忙しかったんですけど	4.52	19.83	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f2ccceca-7449-4cb0-836f-cd189db4ae7c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	昨日発表が終わって、論文が終わりました。	5.11	24.35	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
72f6f0cf-0fad-42e3-9cc5-3d70c44b6564	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だからこの九月…九月に大学を卒業ですね。	5.32	29.46	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0a409386-52d8-4e7a-8b01-0eb812e99b87	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	大学…修士課程(Master&amp;#39;s Degree)	2.98	34.78	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b3679195-0c34-4522-a3cb-f736d09c93b0	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	修士を卒業。	1.88	37.76	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
2ea83856-c09b-4bb7-8669-0d7b1e95bec5	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	いや…論文は実は、最後の四ヶ月ぐらい頑張って	8	39.64	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c5b6cfc8-2f99-4ffb-a685-645ad855f74d	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	その前はもう全然勉強していなかったんですよね。	3.92	47.64	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
beb3aacf-c459-4874-b36a-9de66ddc289e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だけど頑張って良かった！今終わって嬉しい！	4.04	51.56	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
53a2ce0a-32a5-43e0-b8dd-c87519b8d1d1	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	テンションが上がっている⤴ という感じです。	2.75	55.6	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
7cc20a3f-4ba7-4354-a7bb-51794a65a5e6	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だからこの夏は、自分が前からやりたかった事とか	5.68	59.32	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
26978641-82a8-4eed-bfce-ee223669fa62	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	色々やってみたいなって思います。	2.98	65	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0a89593b-dd46-46c2-a958-a457e9b5256c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	結構私、絵を描くのが好きだから	2.69	67.98	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a7b69450-2160-4c43-b09a-57336cab3ad8	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ちょっと絵を描いてみたり	1.98	70.67	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
2d4a35ac-ad0e-40cf-ac6c-51bc83d6b601	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	部屋を掃除したりとか	1.52	72.65	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3c64edb1-c7f1-41c8-8c42-1565cddadb14	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	いろいろしたいなって思ってます。	3.21	74.17	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
20ebb339-b301-46f4-8503-1997dd1c2c8a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、今日は発表について話したいんだけど	4.41	77.38	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a2fc7af4-9ade-4e33-b2f3-e707736c735b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	私結構、プレゼンテーションは	3.79	81.79	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b91f159c-b830-401f-9345-7a9170d56630	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	自分で言うけど、結構上手だと思うんですね。	4.92	85.58	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a72b2367-c519-45f4-9448-6ee365c2241e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	その理由は、結構練習もたくさんするし	5.86	90.5	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
685d1155-3f8b-4c2e-a208-ab0d0796ac0e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	声が大きいんですよね。	2.17	96.36	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
6e51ce5b-5f2b-42ca-84da-76477e8e5f27	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	はっきり ゆっくり話すから、結構上手だと思う。	4.43	98.53	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
22d50d1b-95a5-4c68-ad22-db7ff8bb0439	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから今日は、上手な発表のやり方	6	103.25	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0e69a384-7e99-41c7-9de0-a7e5ff6a04f3	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	上手なプレゼンテーションのやり方	2.3	109.25	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0c9d9aad-8599-4c24-ad68-f999f43dddf6	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	私が知ってることをちょっと話したいなと思います。	5.01	111.69	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
855093ef-bc79-4b50-b4ba-1e5763275b72	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから…役に立つかな？みんなの。	2.89	116.7	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
23c918b6-8d7a-44b8-bba9-f1a85e5efc9f	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	役に立たないかもしれないね、わからないけど。	3.59	119.59	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
41c91534-c6fc-485a-b24e-82d903ded1ab	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	でも私が得意なことだから	3.63	123.18	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
8f339fda-c0fd-4797-9949-f20854a0d573	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ちょっと今日はそれを話したいです。	2.56	126.81	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
27d1a9fc-6d5d-466c-b0f4-e422af8fcff7	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、私はずっと発表は昔から結構得意でした。	6.54	130.49	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0eba89ec-3367-49ef-9537-56c21bf75053	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	みんなの前で話すのはあんまり得意じゃないけど	5.04	137.03	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b72f1bf9-66cd-4d31-b098-b0fe1e2da3e5	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	発表は得意なんです。	2.6	142.07	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
81984c9a-68c0-4794-9392-e8cf4ec7d3fa	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	私はリーダーのタイプではないけど発表はできる。	4.58	145.34	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
92ae8112-11ab-4c95-8088-40b4d7aca24b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それはやっぱり練習だね。	2.15	151.11	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
655e8a49-186f-4404-9faa-27fe51b29d42	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	論文の発表の時も、その発表をする前に	4.51	153.26	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a5e1ed25-e264-433d-bdf7-765eacefb9e3	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ちゃんと原稿(script)	2.26	157.77	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
8a803432-f7e5-4324-9170-62817b3bfe86	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	言いたい事を全部、紙にちゃんと全部書いて	4.2	160.03	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
d847e991-fda3-4065-b252-47c27bc34f2d	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それを覚えるくらいまで何回も言って	5.25	164.23	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
e047f097-8681-4c9c-8f0c-e99eca61fdf5	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	本当に覚えるんですよね、ほとんど。	2.99	169.48	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c3e753b5-5b00-48c8-8cc1-603e59d2287c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それぐらい練習する。	3.94	172.47	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fc228d3e-ef1b-4709-940f-eb718e621ace	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、実は昨日の発表はZoomだったんですよね。	4.96	176.41	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3ff1ddf4-4831-4688-bdbd-52b539335dd1	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから実は練習しなくても	3.02	181.37	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b6ed9035-4fee-4940-a76e-97601a1364a5	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	このパソコンの横にタブレットを置いて	3.96	184.39	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ef2c5683-823f-4683-be6b-1ddc5c81257b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	もうそれを読むだけだったんですけど	3.33	188.35	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
8e00874d-7957-4af3-9607-1cba57e0a181	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	でも四回くらい全部読んで、読む練習をしました。	6.16	191.68	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
2d682d6c-1105-4686-a824-a4a382109bdd	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり初めて読むと、自分で書いた文章でも	4.27	197.84	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
9e4b3a9a-be57-409f-8002-d332de48fc48	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	読むのって難しいんですよね。	2.68	202.11	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
749a6fee-10d5-4cd4-ad13-cac8b01ee7d0	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり自分がちゃんと読む練習をしないと	3.14	204.79	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b4643027-fdac-45b6-accd-247d889a145c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	どこで文章を切るとか	2.85	207.93	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
83cf70d6-8fad-44c2-974b-837d3faf639c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	どこを強く言うとかがわからないですよね。	4	210.78	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
430da1ea-3d0d-481e-a431-2eb10e9ef832	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり大切なところは	2.16	214.78	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a9cd83f1-f09f-4dc5-9023-903c0b527408	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ゆっくり はっきり言いたいし…わかります？	3.83	216.94	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fcc5ff34-6d0c-476e-b7a7-feeee4e02706	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、大切なところを言う前は	2.71	220.77	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
782f73ef-5bed-4aec-9275-c38e94092619	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ちょっとこう…こんな感じで	5.53	223.48	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3ca1c7f9-dc91-48cd-b260-b3d99d9131f4	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	何も言わない時間を作ったりしたいですよね。	4.23	229.01	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
aff17d4d-db8c-46d9-b223-36849b13a1fb	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	言葉と言葉の間に何も言わない時間を少し作るとか	7.22	233.24	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
d9e9d163-35a9-45b7-91bd-da874427ebe2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	大切なことを言った後は	1.85	240.46	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
4a16d3e7-134d-4cc2-9ec1-7f01cf565c98	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	最後の「です」とか「ます」を	2.83	242.31	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
794f7a64-b363-4844-a851-9310bf7c80e7	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「です↘」…低く言う。	2.53	245.14	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
2ff6a0be-c57a-4dda-9e2b-ef1cbf6e67da	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「です↗」じゃなくて「です↘」	3.4	247.67	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
8f5c9b19-e2bb-4008-a369-2690bc93613b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	こんな感じにすると	2.5	251.07	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ff8297de-3300-49a1-892c-be45c0be7c18	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	なんかカッコよく聞こえるなと思って発表しています。	5.6	253.57	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
7f4a8a17-df5e-4be0-b13f-ddf172dbf17c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから、自分で発表することを	3.96	259.17	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
cdb0d55c-f707-416b-a6a5-89f63d299735	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	全部ドキュメントに書いた後は	2.64	263.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
975dc2de-39a0-4700-a762-b0d32f438039	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	何回も読む練習をするし	2.36	265.77	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
09022d21-9f6c-4796-b876-e4fae2220aa2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あとは発表の文章はすごく短くする。	3.94	268.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
5974ed58-6cfd-4bcc-bd98-cba7c4a9f4b2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「〇〇ですが…」とか「が」で	2.85	272.07	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fa784b8e-2a3d-4304-be7f-274a22827c70	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	たくさん文章を長くすると	3.14	274.92	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3a0dc298-24dc-4136-9344-ee25e0344f16	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり聞いている人は目じゃなくて	4.34	278.06	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c1a67089-942c-4b55-be51-ebeeb7efdd9a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	耳で話を聞く、理解するから	3.57	282.4	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
daace7a7-4b13-47d6-b17f-dd8a649264a3	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり長いとなかなか覚えられないし	4.91	285.97	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
71fb11ad-5b1c-4da3-9f14-531bbbef88c6	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	理解できないと思うんですよね。	3.08	290.88	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
11bb7aae-b817-42de-8858-39887c9cf4c9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから一つ一つの文章はすごく短くして	4.73	293.96	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
6ba78e04-dc48-46fe-bf60-f47d79f0b5ff	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あと紙に書いていると「あれ」とか「それ」とか	4.78	298.69	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
66fdf034-56e6-4333-a34b-1de61f06523b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「この」とか という言葉を使いますよね。	4.59	303.47	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0424622f-f25a-4201-a71f-21a55c28b1a8	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だけど耳で聞いていると	4.01	308.06	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
6498a0c5-27ec-44a0-b74d-9b705f0ce6f0	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「あれってどのあれ？」みたいな	3.06	312.07	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
5c7d5e75-b048-4dae-82b7-0336ea4238b1	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「あれって何の事？」みたいになるから	2.6	315.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3236c597-2294-4995-97cd-5891cb0758c4	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	発表する時は、同じ事でも何回も言うし	4.92	317.73	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c1c4d204-c3ee-49e3-b87e-f2fdea7eb400	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あとは主語とかもしっかりちゃんと言ったりします。	4.74	322.65	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
869611c4-8b10-482c-ab0f-f62e119e5fc9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	そういうことを気を付けて	2.09	327.39	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3d7f6acb-11f7-4a1a-b5e2-1d85971d295a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、四回とか五回ちゃんと読む練習をすると	5	329.48	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
891d9551-d5b7-4fb6-9580-39e96de6f9ed	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	本当に上手に話せる。	2.82	334.48	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
082935d5-abf9-4e4f-aa6a-a9a280186183	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、私が四年くらい前に大学を卒業した時の	5.77	337.3	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
d02a6277-2f72-41a8-8c83-7c1f9b1f4844	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	四年前の論文では	2.52	343.07	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
aa022055-91a9-4891-9f31-db7af359685e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	本当に私、十分…七分の発表を	5.56	345.59	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
6e18164b-53a9-4328-bc5a-a462ee8f903b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	レジュメを作って、それを全部覚えて発表しました。	5.82	351.15	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a43bd225-448d-49b0-a0ba-610bcd2ae5ad	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	一応紙は読んでもよかったけど、手に持っていたけど	4.77	356.97	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fcc5da6c-f7a5-4ba7-b633-c9971d4f70d4	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	全部覚えて発表した。	2.68	361.74	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
3f3e3cb3-00de-458e-8b89-a2db7d9c8e0a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それぐらいするとなんか…私は安心する。	5.75	364.42	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
93ce2031-7a41-4d6c-aacb-344094342623	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり初めてあんまり練習しないでやる方が	4.65	370.17	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ebbe27c8-dc96-43a7-9999-a4dda9a0e058	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	私は怖いなと思っていて。	3.26	374.82	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
064ec758-4711-47be-9be3-6b5cff9e23a3	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あとはパワーポイントで一枚のページに	5.46	378.08	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
143a3363-18f8-4d81-9088-e63eb625caf5	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	絵とか図と、あとは文章を多くて三つとか。	5.48	383.54	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ac106211-3149-430e-83af-2dca6377b9c2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	文章も文章じゃなくて、本当に単語だけとか	4.72	389.02	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fe9a0220-8487-4010-98f6-a7065b48b256	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それぐらいシンプルにまとめた方が	2.94	393.74	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b8d7aa72-9448-4768-a657-656bdf9117d9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	わかりやすいなと思って。	3.54	396.68	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
df51a074-6317-45ef-acae-d6f5cb054392	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	なかなか難しいんだけどね。	2.37	400.22	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
820021c1-dac0-474b-9694-1ec6feb4f013	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	私もそこまではシンプルにできなかったけど	3.43	402.59	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
738bc9df-8495-49bf-aee6-8ca9a9d3e633	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	でも、できるだけ本当に	3.93	406.02	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fd6d90e1-b350-47eb-8fd9-f9dab1af6fdf	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	大切なところしかパワーポイントには書かない	4.27	409.95	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
bfd4a000-144a-424c-96e7-c193fb402adb	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あとは全部話すという感じでまとめました。	4.97	414.22	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
41bf5078-9def-4c09-9b23-e60235562540	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、私四年前の発表の時は、TED Talkを見て	5.95	420.35	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a7bc9afd-7d6c-468a-ac87-1274a1638c62	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	上手なプレゼンテーションの作り方を見て	4.82	426.3	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b5ab719a-1d30-4c83-b8c9-c271441443c9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	プレゼンを作ったんですね。	2.27	431.12	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
175033f0-74c9-4046-8622-f500a2401d29	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だからプレゼンの背景は黒。	3.15	433.39	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
be5826fe-c2ff-42ee-ba89-94ad31902499	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	白は光って読みにくいから黒にして	4.67	436.54	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
bff099d3-20a5-460d-9fb8-cb45d878d471	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、字はちょっと灰色。	3.32	441.21	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
6aa7a472-8b4b-452c-9562-2040ab14c978	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	真っ白だとちょっとまぶしいから黒い背景に白い字。	6.08	444.53	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
cca1098a-1772-456d-b2a4-6875326e5d24	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、一ページに写真を一枚だけ。	3.55	450.61	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
2d0850db-4d18-4c81-a1ad-82e659017b28	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	文字はほとんど入れないで	1.7	454.16	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
5bce6476-c1d4-4475-9e3f-737414514ca3	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	プレゼンテーションを作ったんですよ。	2.52	455.86	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
179a1635-fe64-427e-9664-a7f4ae428d57	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	そしたらやっぱり大学の論文の発表って	4.34	458.38	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
4d945896-2f88-4444-865f-6f74b7c02f73	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	なんかTED Talkと違って	2.58	462.72	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
83107202-b200-4d35-885a-8aa648381a45	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	もっとちゃんとしているんですよね。	2.1	465.3	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a34cda8c-bdaf-4a5e-b4cd-d3d51068723a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	最初から何を話すか目次とかをちゃんと書いたりとか	6.53	467.4	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
32e38a5b-93ad-4544-a4ca-88cd4d9e5c04	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	発表の、プレゼンテーションの下の方に	4.23	473.93	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
d90a9c33-4723-4ecf-bf65-6ce87cc7fc9d	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	本の名前とかも全部書いて	2.4	478.16	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b84fc3d3-03e0-46c4-8d38-53d64aadd062	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	みんなすごいめちゃめちゃ読むのが大変な	4.42	480.56	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
339c545c-51de-4955-9bf4-83c51d9aafba	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	パワーポイントを作っていて。	3.5	484.98	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
e36030b9-5a49-4570-9b3c-7bfd5cbb84a7	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	でも多分それが当たり前なんですよね。	3.1	488.48	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
36c2ea7a-b7fe-4837-a036-01fe7bc0f410	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから、私のパワポだけなんか	3.06	491.58	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
e99adce4-4c12-49ae-8d49-ec42d0efa3cc	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「お前 本当に論文書いたのか？」という感じの	5.23	494.64	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
7ad9423d-6064-4996-a94a-a25d0b0becc2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	すごいシンプルな	2.32	499.87	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
4f784eb4-b2ce-4f01-aad6-d95239f4f43c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	「お前何そんなカッコつけてる？」みたいな	4.16	502.19	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f1c8dc16-ac8b-476d-b539-4d3aace8ad9b	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	そういう論文というか発表を	2.58	506.35	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
0421a097-de10-48de-ae2b-6d3da41a406c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	作ってしまったことがあります。	3.1	508.93	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
5af9772c-6ece-4f54-831e-0f9fe2a7535c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だけど…いやでもやっぱり	3.28	512.03	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
de093b76-3bc3-43bb-8ac1-762de902c122	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	わかりやすさが大切だよね。	2.94	515.31	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b5b6a2c8-5b44-410f-b9a1-dbe6b48c63f9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	自分がどれだけすごいことをしたかを	3.41	518.25	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
9d26e120-c2f8-4019-84fb-46eac5c153c6	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	伝えるというよりも	2.24	521.66	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
844cb95c-8e2e-4139-9680-c45cece6b378	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	みんなにわかりやすいように話すという方が	5.01	523.9	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
cb6845d0-f60c-42f9-972a-c1da9486c87c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	やっぱり大切なのかなって思います。	4.23	528.91	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b0a0267c-9da5-4ab7-a159-0aa1148150e4	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	そう…だから私は結構発表は得意なんです。	3.87	533.14	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
ebbaaaa6-a89a-45ae-897b-3112161305e8	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	考えるのは苦手だけど、発表は得意。	4.08	537.01	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
dcaf1711-557a-4c6f-a9d5-67c08288418e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	そう だから皆さんももし、これからもし何か	4.02	541.09	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
97e3e6a3-56d6-4b63-9392-b8ae92b79c22	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	皆さんが発表をしないといけない時とかあったら	4.27	545.11	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
446e1b27-1444-4312-8043-48d63c444c76	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ぜひぜひ気をつけてみてください。	3.22	549.38	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
d3329b94-06ca-491b-8453-8adbcba518e1	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	四回くらい読む練習をして、文章と文章の間に	6.03	552.6	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
61ae67d7-989b-4dd3-9510-c33f9342883a	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	このブランクを、間を空けると	3.14	558.63	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
81b95e2e-1884-4fa9-a1fa-7b390b6d693e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	すごくカッコいいんじゃないかなと私は思っています。	3.27	561.77	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f8fb2d9f-929a-4c2b-ab70-e39fba9fe811	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	わからないね。	1.85	565.04	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fca56b57-b5a3-4863-a8e8-9e9c483711d6	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	じゃあ今日はこんな感じで終わります。	2.39	567.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
435e34c6-2a91-41d0-b61a-a3db5b4d8417	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	最後まで聴いてくれてありがとうございます。	3.23	569.52	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
b96de5c3-7da1-4b09-afbb-a0ecb0af7e1e	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	Patreonもやっているのでよかったら	3.34	572.75	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a513b5eb-7457-4c6d-9453-55b7033dc3b9	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	Patreonでサポートしてくれるとすごく嬉しいです。	4.34	576.09	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f5978888-1d0f-44e6-a482-45a87d7d92de	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	月に四ドルで	2.16	580.43	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
fe503372-d07c-48db-8992-1c554a6646f2	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ほとんどのエピソードのトランスクリプトが読めます。	4.54	582.59	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
9e16bb47-92e0-4077-aba1-8adb343030b0	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	それは&amp;quot; Japanese.IO &amp;quot;という	3.23	587.13	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
13051d3f-898e-40b5-a9b1-077aa35d82e0	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ウェブサイトで書いていて	2.67	590.36	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
582210b3-89b0-4b4e-83e9-99718d737e0c	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	ふりがなもワンクリックで付けられるし	2.93	593.03	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
7230465a-ee19-447f-b70c-c23f4649f2be	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	あとは英語の意味も単語をクリックすると	5.66	595.96	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
33913eca-697d-4476-b74c-a709ef228302	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	すぐ調べられます、出てきます。	3.43	601.62	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
9e7fd850-8b3c-431b-97b4-303c0fe208e7	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	で、Japanese IOはChromeの	4.29	605.05	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
f5c71bd1-9f3d-477a-8a05-e91b757b75fb	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	Extensionでも使えるんですよね。	3.33	609.34	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c3d916c5-77d9-4936-81d0-c64a508a08fc	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	だから皆さんもぜひ使ってみてください。	3.02	612.67	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
a111990d-cbea-472b-be2b-1fa34f2e0553	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	じゃあ今日はここまでです。	1.35	616.43	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
c87384b3-78f4-4ca0-97e2-7ada9be42cf7	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	いつもありがとう、よい一日を！	3.28	617.78	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
864493e9-6c6c-4bcb-a1af-92e5265a17a8	2025-03-21 12:40:12.316247	2025-03-21 12:40:12.316247	またね、バイバイ！	2.19	621.06	ja	f21efbd6-053c-4ae8-b35b-7e209aca8143
568d7a3d-d3cd-4fc4-9831-e68eb8027010	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	진심으로 도와주기	5.479	2.04	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6f305c29-f24c-458f-ab05-8613b0ee06a3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	7.07	3.62	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
286a0fdd-dc18-4fe2-9d65-a9b38950bdd1	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	me2 으	3.171	7.519	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3f959282-ec29-448a-809d-9d9b5ce77eb7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	으	1.65	12.05	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9feb4f8d-6626-4ac4-8ace-ec9cb64b575c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	왜	4.32	12.59	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cadbf057-85ba-446e-918e-5a6b9faef792	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	타만 의 기회도 아무도 없잖아	5.13	13.7	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a94612ab-69d8-4d53-8cb6-b9150d1e381a	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하 갱 이렇게 날씨가 좋은데 누가	4.23	16.91	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9d19db3b-9c1f-4928-8e45-e49b34d3b2ad	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	집에 있겠어 가려 어딘가 노려 며	5.449	18.83	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cd4b0338-0ca6-4e80-8001-b70bf1b000fa	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	갔겠지 9 좋게 까	5.459	21.14	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9a846629-b54a-4fbd-bee0-c54155af8eab	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이 좋았어	6.191	24.279	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
39255408-67bb-4505-9c9a-7bae0ab27530	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아빠 1월 여보세요 아 뭐야 5일	6.571	26.599	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b4af77ce-4dec-4c27-a6de-37021b5e580b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	케어로 와 특히 날씨가 너무 귀여운	6.269	30.47	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
dd6cd49e-64a5-4eee-bfaa-3f74bba1217b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	거예요 으 얼굴 거움을 모처럼 날씨도	6.42	33.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f2e0f732-e93e-48c7-b45e-73c4d6359488	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	찬데 방구석에 망 있게 나 타짜 나요	5.581	36.739	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
64d599d0-e580-43d1-8ed1-a8bd9e4db4cf	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그릇에 바하마 뭐라도 아깝지 않은데	5.01	39.59	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
df9f6fba-614b-42f1-bd98-5013fbd20f1c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	좌우 오빠 그러지 말고 우리 놀러	5.73	42.32	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cf930f85-7588-44cc-b77a-b00b1d785a9c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	나가요 지금같은 대로 백화점 하면	5.88	44.6	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f2053072-3bf0-459f-a62f-c13f8d29fdcd	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	창문이 없어서 비가 얻어 놓은 요도나	5.25	48.05	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8091832b-12a1-4573-8559-16ff6522a212	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	시 랑 산과 몹쓸 텅 알 아이 격이	6	50.48	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6f4bcb15-d48f-409d-b481-8b1f8b1fe56c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그런 동물 같아요 턱이 라 한달 더	4.919	53.3	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1a920386-c38f-4e05-a9dd-d7634ae36c87	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	무 라는 사람이 많아서 고생을 하다	3.69	56.48	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e49829a5-295e-4a66-bbdb-7442454e6ca0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	고 기뻐한 걸 알 이런날은 집에서	4.98	58.219	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b2b60370-72d9-4bb9-9286-79e31d94afe5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	테잎 입어야 빈둥거리고 최고 다음	6.51	60.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8c44d50b-ef5b-430c-b216-06a180e6dbe8	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	거의 정 심심하면 한 데 없더라 좀	6.571	63.199	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f23171b6-04fc-44c1-b1b3-2f3e162bb0e1	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	보렴 됐어요 어째 b 아무래도 안	4.92	66.68	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
95610e54-ac33-4d42-a88c-bff20ca7ac2b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	데려가고 는 게으른 아빠의 어깨를 줄	4.83	69.77	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
33fdbc57-68eb-4a49-b302-8deda99a7124	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	몰라서 뭐 되요	3.78	71.6	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
abcf005a-0c62-47f4-9770-ddd38c1f96b3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그	3	74.6	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
acc39d0f-e1bd-4011-a629-a8950711a921	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하루 거기 하라고 하기	6.51	75.38	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8e63eb40-5174-439c-b533-b8668670456d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐 왜 뭐 보고 계세요 움 a 거구나	6.45	77.6	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
50c9b780-3397-4d6a-a433-8c5c40efbe1c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	실은 지금 막 옷장 정리를 시작했다	5.16	81.89	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1c447e9a-b1a0-4605-879c-dd70ddd70b76	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	따 언니는 말씨가 해줘서 참 수학	5.46	84.05	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a0e9948a-b25e-4a0a-bc77-fe263388cd20	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	2교 큰 아 이럴수가	5.1	87.05	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c480b3b0-a022-43ae-82ab-e7929213a2d0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	모처럼 할아버지랑 산책 가려고 했는데	4.77	89.51	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8341a190-db38-4c01-943c-90aac40959c4	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그것 좀 하셨구나	4.26	92.15	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ffe85e50-ffda-4225-b77d-9204229271e3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그렇지 멀고 니가 도와주면 빨리	4.47	94.28	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
93cae1bc-583b-4716-82df-e0a4b6dff843	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	끝나서 산책을 나갈 수 있지 않게 미	3.51	96.41	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
832f323a-91d8-48c9-ad45-9e0bed37e2df	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	꽤	3.69	98.75	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a839aba2-626c-47bd-8a64-d672d0cae038	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 그의 그냥 나중에 해야 되 게 요	5.46	99.92	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6a1197a2-5a08-4f5b-8b22-b8805e9e5b41	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아이 중 크림의 2가에 모르고	5.79	102.44	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e83ca5e4-1da6-4e84-b00f-05b8cac11573	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐야 할아버지가 안개 당의	5.4	105.38	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6a45ef0e-4ce3-440d-8cf4-86e7c54b377b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐 어쩔 수 없기에 언니랑 카드 게임	4.62	108.23	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b1acb489-17c6-45ca-ae6d-bb6db01280ce	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이나 하는 수밖에 가드 게임 무	5.31	110.78	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b4651294-2a69-466c-ba26-58a1d935fb95	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	땅처럼 찾아가 나 여태까지 엄마를	5.43	112.85	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
aaa0efe4-b207-4519-b1c3-1bcf66dbdb29	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	도와서 보험 위로하고 왔단 말야	4.38	116.09	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fdedca38-0e8a-45ac-be32-e8a89f44f794	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	지금부터 심해서 혼자 즐길 거야	4.26	118.28	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8c8930be-e3bc-43f2-8d61-dcef4d1b82c5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	히 계획해 사기나 쳐다 볼 거면서	4.77	120.47	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3d41275a-df9e-45bc-8026-8171f785d798	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	나를 코너도 놀 생각을 하지 말고	5.63	122.54	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
19f722f7-2085-4efb-9181-55db2f82e492	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어디 러진 방이라도 치우는 게 어떠니	6.43	125.24	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
75bd0f0a-389d-4234-a704-0ba3d3c5cc99	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	줘 아 의해 이렇게 더러운 방에	5.39	128.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
bb0313f0-bb97-41a4-a2ba-a5ba533c8178	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	갑자기 친구들이 라도 오늘 어떡할	3.03	131.67	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
bad2397c-9857-404c-bf58-74a70fd0f537	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	거야	3.63	133.56	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
84dae039-1ebc-484e-b08a-7708eaf43474	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	최근 한번 꺼내면 그대로 방구석에 과	4.65	134.7	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a6f08581-fd96-48f5-ad13-8582abf880da	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	저도 아무데서나 먹고 장난감 은 또	4.89	137.19	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fdc84ba5-6a6d-424b-8d4d-1ba9c04d0cf1	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어느 또 잔소리에 안 소리 안에	5.37	139.35	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
37a2faed-0cf1-4ae6-a4a3-2885a2840b3a	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	생겼어 너에겐 정말 걸작을 어 이리와	3.9	142.08	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0d2af2e1-4d67-40d7-b7ee-58fd8cf30ae3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	버려요	5.39	144.72	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
84acef51-4873-4f5d-9452-72b1a81cc42b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	엄마가 내 풀어내 컬러 바하리야	4.13	145.98	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
43808ec4-0cde-4bb8-a001-ba802695812f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	후 리스	4.78	151.29	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ca9b0355-8088-4945-9482-59725811cd5b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	미안 하지만 간장 좀 세워 겠니	2.94	153.88	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8947781a-fefe-41cc-9cf9-4befb2dd46fa	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	예	3.12	156.07	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
92a00ec4-7bfb-45e0-af0d-c24a5c06edf9	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	강정은 무거워서 쉬운 돼	4.32	156.82	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
88b2aee5-7512-48ba-856b-ecd37325de89	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그치만 엄마는 자리를 비울 수가	3	159.19	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
78128d52-78ec-4ebf-b765-427712a9bf0f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	없잖아	3.42	161.14	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c592c56c-15cb-47a9-b333-bf6a00c19450	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그러면은 일을 시키면 되잖아요 어느	4.17	162.19	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4bb9e48e-ff64-45a9-bc2d-8ebf616d0b28	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	조금 전까지 아침 설거지를 했단	2.73	164.56	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3171a12f-4e2d-427a-b3a3-cb23c6917bfa	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	말이야	3.63	166.36	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
141c2f1c-1199-4b69-8119-a5297720dd77	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이번엔 니가 신부로 말 차례야	5.79	167.29	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
47578cf2-db8b-4229-a96a-21de323026e5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	심부름은 정말 귀찮은 일 해상에는	5.13	169.99	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b0c336a5-da68-4adc-82b9-bec5b9e74d40	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	가족들을 위해 몇 킬로나 걸어서 물을	4.35	173.08	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a6cf87ea-2470-4c0e-b104-29f8bf703a17	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	길어 오거나 함정 일반 일에 시달리는	4.89	175.12	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0de2afad-52f2-4b35-83ec-5aeb2bd9ff7c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	불쌍한 아이들도 있는데 뭐가 괜찮아	4.59	177.43	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
373f3999-0af5-43f7-a853-584bd642f999	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어쩌다 한번 심부름 하며 투덜 대담	3.57	180.01	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e35fb573-8217-433c-9111-cf2433ce3119	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	큰코 다 질 줄 알아	4.14	182.02	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4c21856c-d261-406f-8333-dbc857b11fec	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	말은 그렇게 번지르르하게 해보고 설마	4.65	183.58	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
2737b62a-1c16-42e3-82e3-28ef44c6404d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하게나 심부름 간 사이에 낮잠 이라도	5.42	186.16	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ed9c7217-6ccf-4e7b-85f6-835087b6c63c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	차례는 건 아니겠죠	3.35	188.23	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8eaf7e7c-c870-4dbd-a71b-931674ff3b05	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[박수]	5.99	192	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a9863d5a-1ee1-4108-b984-aa348938c98a	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	모처럼 에 일요일인데 엄마의 간장	5.87	195.2	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e2e4a079-ec26-494b-af0f-845485e32e1e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	심부름이나 해야할	3.08	197.99	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0d35e6a7-34cf-4dd8-b37f-4e8cc8ff0bf1	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	학령	5.37	202.7	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5b126698-3e2b-4263-9116-fb1eeb31635b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	마르크 가게를 돕고 있구나 음	6.36	204.29	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
62e858a1-0b45-4dc9-b0ef-e85aa608cc30	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	엄마가 배자를 하셨거든 5 처럼 a	4.86	208.07	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
74e58b7b-e485-422d-b57f-2894e8ca0170	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	루 일인데 가게 촌 소랑 2 너도	5	210.65	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6cbeb8fc-4c85-4580-9063-990065eadc67	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	나처럼 안됐다 뭐	3.56	212.93	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
10326b6f-5ec6-477b-850a-42e70c6db27f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아	2.46	215.65	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9579f6eb-e3ba-4848-9d6d-9fb313d6cfdb	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	특집 하다가	3.69	216.49	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
365a3a4e-6139-4660-9130-28b94457aa93	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그런데 이 꽃은 이름이 뭐야 그건	4.709	218.11	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ee1b6b75-c23f-4603-9846-233706da5624	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	불이 지어야 향기가 좋아서 향수로 도	4.41	220.18	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0a8e1b8e-2b38-427f-be29-f664322a6f44	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	만들고 4	4.801	222.819	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5fe7cd14-b921-42f7-a52c-4a55c0bd3e88	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그런거 꽃은 저건 또 그 옛날에	4.81	224.59	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
05d5c7bf-2d12-464f-9228-89b89c7345c7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	약초로 쓰여 때 으	3.73	227.62	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
216ebab7-a86a-4fec-b6b0-8dc46462f01d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	4.68	229.4	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6c156e34-8680-48bc-815a-2a92b36db033	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	실은 민들레 나 국화도 약 제 2권에	5.49	231.35	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
372c9339-6eb4-47bc-bc89-946ebf00092d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	크루 코마 그러고 보니 넌 꽃박스	7.26	234.08	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a7dab47a-18f7-43dd-98b9-af87e32fcccd	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	상인의 아냐 지 그 정도는 저기에	6.77	236.84	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
456c8d0d-7d97-4b00-943b-d5f4d4c62f83	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	전화로 국화를 주문했었는데	4.68	241.34	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
81737ce3-ae83-4cf4-aa2c-c3fc862c5ccd	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	r&amp;amp;d 오셨으면	5.11	243.61	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
27934739-c9f6-41f9-b667-813354dba33e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	잠시만 기다리세요	5.85	246.02	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a2fbb659-2291-4ee9-a42e-2f2e324005a5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	음 여기 3,000원 입니다	5.13	248.72	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fe055efa-577d-4adf-a0fc-ec0fd23f4001	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그래 고맙구나	4.86	251.87	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3ef380b0-2076-4a9b-8ae1-3bb8a3c22038	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	고맙습니다 그럼 다음에 또 자야	6.03	253.85	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9c6702bf-26b3-4b33-bc74-233c050ceb3b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	구조 9분이 진짜 카게 종업원 걸까	4.05	256.73	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9127d7f0-94ee-4703-97a1-faab19fc5ecc	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	4	2.91	259.88	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
20512e0e-a712-4ff4-ab24-35bd0306d45b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아그야 여긴 진짜 고가교 니까	3.46	260.78	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e68f15b3-6302-4db5-bcb8-0432b76a019c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	당연하지	3.75	262.79	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fa11b7e5-a3b5-474c-9f62-3ac6a7eb8bb0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	5.06	264.24	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cce7c5b9-c82e-4987-92eb-e831198620bd	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아무리 봐도 진짜 좀 오버가 따 qt	5.43	266.54	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a461eb8b-d6a6-492d-8c7f-6efbbf79f6c0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	가게를 도와주면 흉터 베 반란군 아	5.64	269.3	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
663e5b3c-7f71-4440-83d6-379ea09d32c2	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 물론 받을 때도 있지만 난 그냥	4.95	271.97	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
05c153f7-46da-4755-a2f5-4b3f6686428e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	돕는게 좋은것	3.69	274.94	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f4f2f902-ef32-4851-a09c-10a652f86df6	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	업힌 줄게요	3.48	276.92	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0b205138-bca2-4aac-bf51-485f96c64f6d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이정도는 괜찮아 네	3.69	278.63	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c33369a6-8393-4475-a04b-9e515a24dc08	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	놓고 전에 많구나	3.96	280.4	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
7f0e3110-75b4-45c0-b2f5-376d6854d535	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아직 나랑 같은 오리 나인데 내가	6	282.32	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fbbbe0ac-54c5-4efb-861b-9084820c61ff	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	좋아서 하는 일인 걸 난 괜찮아	6.48	284.36	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4d0b6e75-6981-4710-b658-6c13fc88b61f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	5회 좋은데 다른 사람을 도와주면	4.19	288.32	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e1fcf65e-1b17-42c8-8f98-d00ed4fd9895	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	좋은노래 상기 받은	3.33	290.84	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
61bf0aeb-af3b-438c-9296-6971400c2e77	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	3.06	292.51	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
187f5062-cb2f-488f-aa68-60cb2f1d9190	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	마다 아	4.47	294.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
7c0575b5-d029-4dc0-8783-eb44a80c2a8c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	알겠습니다 그럼 멜 베라를 드릴께요	5.5	295.57	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
db026ae6-2e97-43e3-87d9-5cbbabdbd497	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	네 감사합니다	3.69	298.64	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4ab08984-9525-4f96-93df-01abc9596fbf	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어서 오렴	3.87	301.07	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6fffd00d-9ba2-4116-8f1e-598d07236ac7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	간식으로 과자 만들어 놨으니까 먹으렴	4.64	302.33	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8398522b-4f39-4169-a79b-d5924702534f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	으	2.03	304.94	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b11fb13e-cab8-433e-87eb-6e87ef9488ea	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	엄마 점심 안 드셨어요	5.369	307.77	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
af16af5e-0806-4529-a6e9-40257f753068	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 좀처럼 밥먹을 시간이 나지 않지	5.581	310.409	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
673d6057-9f35-4714-a09d-2ab3e6c33cc9	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	보니의 요구 염을 안되요	4.53	313.139	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
83d9ef43-17db-4309-b73c-cb094efc7803	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	나도 도우 되니까 우선 식사부터	4.679	315.99	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
8124c897-8b7e-4803-b129-3121263b4345	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하세요 네 엄마 1 그래 그래 아들	5.4	317.669	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1eb0fdbc-a0a8-4b1e-be13-97903b9a6d7f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	니 말대로 할게	5.25	320.669	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3d72506f-e1e0-4f3d-8c61-bafbf3767847	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	우찌 비랑 게 알고 보는데 바쁘거든	5.46	323.069	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fd144b36-163e-4ead-8f15-bf2057866898	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아침엔 물건을 두려워 야 하고 배달	3.75	325.919	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3b94611b-b7ac-47c7-9f0c-a09209c9057c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	돼야 두고 5	3.331	328.529	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
7e1b1524-98fa-4eea-b6f1-b78bc09b592e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	전화 주문을 받거나 꽃을 손질해	3.27	329.669	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a02be995-3b87-443d-abd1-956a78d91101	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하니까	3.239	331.86	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a491bf25-4058-4e71-93d0-7269c640490e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그래서 내가 조금이라도 도와 드려야	4.861	332.939	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c36d865b-27fe-4b06-9797-744d9aa73145	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	엄마랑 같이 느긋하게 식사를 하거나	5.641	335.099	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
09f1df52-e896-40d7-a948-12a67d189579	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	얘기라는 시간이 생기고 4	5.009	337.8	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5fa7e5f9-8e57-40f2-a1d3-f006d10fea70	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그게 좋아서 가게 일을 돕는 것	4.319	340.74	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
abbabd12-0a16-41ce-9f41-69116b568fad	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뿐이야 후 좋구나	4.5	342.809	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b7723756-e033-4be1-b67f-bb10fe00db8f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아무리 생각해도 던 정말 모범적인 착	4.92	345.059	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
14fb61d8-3e77-4f2d-9249-cd2b6d1b5219	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	품 이 야 그러나 도돌 폰 밭으로 칼	5.73	347.309	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
bd3d18f2-ade2-4d69-84e4-398589f5c8f2	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	킹 군단 특별한거 없는데	3.641	349.979	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
273519b1-dd24-4854-a93f-29b1c689413e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	엄마 왔다	1.731	353.039	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1dbc1b82-72dd-408f-b392-dcf462381428	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	2.169	353.62	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a5d7aa67-c72e-49fa-85b7-380435248249	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	oi	4.35	354.77	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
14ecd26c-d409-4916-b71b-ca0840a2a135	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어서 새 엄만 방영하게 요 아 오 나	6.78	355.789	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5d25ff86-b390-45ec-9d8a-750b436890a0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	마 루 컸구나 안녕 엄마 반전의	5.88	359.12	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
320c842d-cc76-4614-b39a-43fe0965c741	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아주머니께서 국화를 찾으러 오셨어요	6.901	362.569	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
2b1d99ba-ae4e-4392-a1ea-9e2859c1d4cc	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	국악 값이 아 고맙구나 k5 무 괜찮	6.38	365	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
aa1c2213-b6bc-4166-9d23-eafce1a90fb3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	님	4.04	369.47	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
196a0c69-3404-4237-9943-c1e2b526de21	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	암것도 안 해요 이 정도 주문할	4.38	371.38	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1a2dad42-3b86-4953-8cb4-93e3dbd89a76	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그렇겠지	2.45	373.51	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5f5da67e-2801-40ec-ad6b-195923d461b6	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아	1.44	375.76	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ee6b4801-14bf-49bd-9027-7fb795fce030	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	1.92	375.96	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
91642b54-5359-4c05-971e-7037544dd598	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	a	3.72	377.2	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e468dde1-841f-448e-9bf5-533b7d8deda8	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그렇지 참 맛있는 과자 있는데 이게	5.11	377.88	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
dfc6a75e-b5f2-4db6-a235-454b94d79649	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	말고 너도 들어가서 먹고 가려고 왜	4.92	380.92	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cc99443c-0f45-4169-a084-ba6aef066374	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	랑 알고 치면 괜찮은게 그러지 말고	5.97	382.99	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c338c3fb-38f3-4aa8-80af-c2891cc67f6b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	무엇보다 말 거야 해 남 그만 가봐야	5.73	385.84	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
40246eef-d708-4179-9ad5-b8efa0f8fb54	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	해 이게 배 도매 다 사실은 꽤 바쁜	5.54	388.96	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
bb8a08e6-3f5a-4e66-94a4-adbfe4b011fa	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	오오미 것 은 n 그렇구나 아	5.7	391.57	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
220535a7-ebfc-4509-bb28-b249051f2f67	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어쨌든 힘에서 강요 우리가 열심히 줘	4.39	394.5	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9f69dd36-3659-4e67-ad55-aeda161cee3f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	하랴	2.96	397.27	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
06d25926-ffc1-44ae-bc7e-8cbe18aec721	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	2	2.73	398.89	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a3291352-5ed6-421e-b3f9-74e3dceaa4ab	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	dwr	3.65	400.23	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
47c0da24-4db8-43af-9058-a2beabbf6d8f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	4.78	401.62	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
139ec5bd-0240-42cf-866a-6e1b619dca9e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	펴 왔어야	3.57	403.88	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9fb46217-8c2b-4677-8eb1-a4391de7e727	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	어	3.96	406.4	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
12d03895-b0b9-45ee-afba-a83cccd7b689	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	코드가 하셨지 마르고	6.45	407.45	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b98a4cb7-3d43-4a21-9657-24e6fe3b7f44	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	언제 옮겨야 판금 왔어요 근데 엄마	6	410.36	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b43399a8-691c-4db3-bd9e-08c2c6f2e0ce	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	너 어디 있어요 좀전에 뭔가를 가지고	5.33	413.9	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
13fec31f-90c1-44d6-bbc1-e460b1f29b13	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	나왔는데 왜	2.87	416.36	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
31960b53-5179-4e8b-b9d8-90b578d1ccb8	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	근데 저는 하루 거지 아주 옷장	4.2	419.48	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
74d6a8d2-f102-4efa-b647-1e189b13515d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	정리가 끝나지 않았으면 저도 있게	5.371	421.639	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b34aa9ca-9557-463e-bd9c-400403a67289	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	해야 그 일이라면 아까 끝나 딴다	6.33	423.68	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
af441326-f6a7-481e-bc01-a8d18ed68871	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	기다리느라 지루했지만 자 이제 산책	6.57	427.01	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
31721f3f-8f8a-4bc6-86ad-861621f0d1e0	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	가졌구나 상 책은 됐어요 왜 그	6.45	430.01	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
0302a7ca-98b8-490f-a224-d339f490bfa7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	것보다 뭔가 도와드릴 일이 없을까요	5.46	433.58	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
997d8d7f-cb81-4b72-925e-ac83606c8257	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이게 마커를 믿고 마이 많아 해야 뭐	5.4	436.46	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b1632e56-2b8a-4e0a-8175-26a5a05331f3	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	도와줄 일이라고 꼬추 먼 거 업적이	8.179	439.04	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
24493803-82df-4a97-9214-83d455005751	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	생각해 내리니 이것 첨 치 음 5	9.529	441.86	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b3f3132e-cf1f-4d3a-ae45-dbe38e3ede56	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	음 알고만 내몸 아 뭐 나중에	6.09	447.219	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
098f3335-3f8b-4b19-a38e-281d4e432f22	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	생각나면 말씀해주세요	3.721	451.389	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5831b6d6-f6ea-426d-8dd2-892e4286630c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그동안 전 방 청소나 하고 있을	6.56	453.309	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
772d6ec5-82a6-46ba-b71b-9af2a066af59	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	테니까요 아 대답이 예 y	4.759	455.11	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e42aa127-1d79-4c9d-9c44-c71399e1fc4b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 울 솟아 청소한 거야	4.95	461.83	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
dd8c2ee8-0718-45e0-8592-93f8137d37da	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	이따가 요시코가 놀러 오기로 했거든	4.53	464.53	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
e6182351-162e-444e-88aa-fafaba2dcaaf	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	너무 더러워서 참수 해 줘	4.38	466.78	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
74339453-2b42-44c8-8c58-55a27dede851	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	모처럼 청소에 마음에 들었는데 벌써	3.63	469.06	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9cb7be8c-464b-409e-8956-9e1b26ca2f0e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	해치워 강 의	3.51	471.16	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
d442afa5-26f5-4f70-a26f-1206f6bacb9c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그건 그런 병에 내가 모터 오일 게	2.94	472.69	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
40c45a20-c128-4928-8f0d-14d3f3bc434d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	없을까	3.71	474.67	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ed4b65c8-383a-4c89-a08a-71e53e39ecf9	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐든지 돌 테니까 말해봐 뭐	5.88	475.63	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
28d0f7f6-9c8f-410c-8242-895f2723cd06	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그렇게 돕고 싶으면 이 방송 당첨 1	4.66	478.38	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
202257dc-2edd-4be7-8f66-3c397211ec42	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	니가 있으면 원래대로 엄마 함께 고	4.14	481.51	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1157d970-551a-4ef4-b9c9-1053581a93db	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	말 테니까 4	5.13	483.04	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
58cb2a78-2970-427e-9ccc-afd467f7a0a5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 뭐야 그렇게 심하게 말할 것까진	4.89	485.65	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c351d7cd-445d-43c9-9016-26da87ed89d1	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	5 별알 꽃	6.62	488.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
a1aa8c1b-4411-4bca-9054-757e0a1da02b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	거참 코치 켜기 약 아	7.5	490.54	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b95764da-aac0-4648-b778-39e2ab51fbc7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐 이래요 아 아	4.96	494.79	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9227653a-313a-47d1-b695-e9e470901e5a	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	오줌 솜	3.81	498.04	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4c22e31a-840f-4827-b031-4d91e7e8dcd2	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	흘러간 세상에 파는 사람이 라니까	4.98	499.75	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
ce1817e2-d07d-4f7e-ad3f-11877222e77b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	우리가 할 말은 아닌 것 같은데	5.72	501.85	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9ae12f95-01fc-4912-b584-73d810cebfaa	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	주문을 하고 나니	2.84	504.73	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
58ebe4a7-0346-49e0-8a26-06318e06387e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	3.129	507.92	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
1ce5e06a-bd0f-4d93-932f-5ad64fffc61c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 잘게요 기분좋게 와봐	8.009	511.15	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4a719aef-cac3-49af-93b8-c3a60e7d1a55	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	5.139	515.13	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
cd22e7cf-fba6-489f-8520-a62d0f4c49cb	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	으	3.531	519.159	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
639f3a0b-1d03-4e86-9699-073c9b3930b4	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	거야	2.421	520.269	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
24229e8f-199a-471d-a9fb-7ff378d8f24e	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	cowon a5	6.72	523.229	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
6312524d-80d7-4fd4-917f-70c93f304c77	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	으 으	3.349	526.6	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
4ef2f644-dc8a-44dc-81d1-97318147a6d8	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아 참고하셔요 코넛 왔다	7.05	530.27	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f1b4fde2-2b3f-48c6-9694-b2f50e8f6787	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그래 집이 있었구나 있자나요 아마	5.19	534.83	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
82c5753f-a9c1-498c-9970-8246d12cd934	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	제가 도와드릴 일 없어요 진심으로	5.82	537.32	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f9198ce8-7dfb-470e-b356-134058589e31	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	말을 도와드리고 싶어서 그래요 뭐 또	5.49	540.02	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
36c4872b-988b-4f78-82e8-4416a05b1cfe	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	우리 앞으 거 아냐 엄마는 그의 우리	4.53	543.14	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
16f57c6b-d48e-4d86-a781-8cc520ca54da	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	돌보느라 바쁜 시장 하여 그러니까	4.89	545.51	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
39a150ac-2498-483d-9037-b11a83352b8d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	개가 도와 비급을 좀 트랙이 않겠어요	5.94	547.67	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
37562f4b-a236-4ff0-844d-d0b509c77f62	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아이구 요구 좋지만 어느 내일은 해가	5.43	550.4	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5f705e42-1857-4176-bddf-83e0037f0f31	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	서쪽에서 뜨려 오너 그러지 말고 또	4.14	553.61	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
221b6c63-a851-4875-b8d5-a064d37c1cf2	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	피해주세요	2.52	555.83	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
099233b6-60a4-4e7b-80a4-4d7fcf0785f7	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	5	2.46	557.75	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
f7955776-052f-4f94-b34a-9e0eeea2c543	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	뭐든 좋으니까 말해 볼게요	3.58	558.35	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
c633bb1a-2bf2-4032-9db2-4d9cce97251f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	음	3.879	560.21	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
9352e398-0d78-49b0-954c-df41e151407d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	자 그럼 저녁 준비를 도와 줍니다	4.969	561.93	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b49e35c2-414c-4499-956c-a7cc8fd695e5	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	진짜죠	2.81	564.089	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3d7a3a52-abab-485e-9735-8db2055a33ce	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	cook 이 병의 간장을 옮겨다 무료	4.72	568.339	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
fc5c4559-6296-496f-818b-f8dbb66efb09	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	4	4.21	571.8	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
eb05364f-0938-47ed-8702-ba7daedda521	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	a 예	7.571	573.059	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
caa3c84f-4ebe-49cd-bbe1-679f5ce310c9	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	으 어 엄마 한잔 없는데요 당연하지	8.24	576.01	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
85468586-2998-40bb-8809-abcf7ba479bd	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	그래서 너한테 사오라고 그랬잖아	3.62	580.63	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
3bd3842d-abc7-412c-af04-34b8cab47b5d	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	4.69	584.67	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
952c50af-f362-4c1f-8320-ad31bf878a9f	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	너 술 말	5.93	587.61	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
68a711d3-4491-4399-ba24-3c1dda69ab1a	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	까맣게 이겨 버렸어요 아예	7.81	589.36	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5258be7b-52bc-4971-9e2e-ce6f6f4b13ba	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	노르 는 청말 난생 첨 다른 사람들도	6.15	593.54	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
876beb0d-d5e5-408d-850a-b80fc08cd488	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	비해 발 벗고 나서 봤지만 접근 부터	5.1	597.17	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5d8cd7b0-a2ac-4f7e-a764-730166e52778	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	딛고 만 가여운 마르코 였다고 볼	4.65	599.69	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
5596234c-e55e-4ce9-9549-a343aefe4f7c	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	수록 잘 하고 있습니다	3.48	602.27	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
58ae5274-bec6-49bf-a61d-898f088b630b	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	아	7.089	604.34	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
b856632d-33ac-4460-99bf-922b2d3b1466	2025-03-21 15:43:08.011204	2025-03-21 15:43:08.011204	[음악]	5.679	605.75	ko	e43e388c-a728-4b53-b4c3-49f8adaf3434
\.


--
-- Data for Name: task_comments; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.task_comments (id, created_at, updated_at, content, created_by, task_id) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.tasks (id, created_at, updated_at, title, theme_color, assignees, tags, started_at, ended_at, group_task_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.users (id, created_at, updated_at, email, password, role, email_verified) FROM stdin;
fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	2025-03-17 16:27:36.326072	2025-03-17 16:27:36.326072	david21@example.co	$2b$10$wMUAYVwF1.aFf1n9cqhgVu9cvXN.mqt0m4tSNQ.CCRI8ruhlKBQEm	learner	f
8085a88b-27ea-482f-b80d-ad4b80cee9ef	2025-03-22 07:03:57.112779	2025-03-22 07:03:57.112779	john@example.co	$2b$10$famsOLDzqucc2M7IV1znRueBUEWZFnzPAHxPYvb1QG6NrnOKkoYUO	learner	f
e07dec84-1737-4af3-bb1a-e94cf567ba6c	2025-03-22 07:04:02.83168	2025-03-22 07:04:02.83168	sarah@example.co	$2b$10$wtDSmb4JpbLUvO.KGQ2JVuVCpjpLteuV/DK2Idbc/eVpdk/70ez/2	learner	f
\.


--
-- Data for Name: vocabularies; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.vocabularies (id, created_at, updated_at, word, type, lesson_id) FROM stdin;
83e62426-dd58-4ea2-be0a-602a843941b0	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	皆さん	noun	e5453351-57b0-437e-ae15-a89228f01437
36fe559c-e382-4303-8110-47e3c852d0d8	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	こんにちは	interjection	e5453351-57b0-437e-ae15-a89228f01437
7ac03ea7-6dda-4762-aa9a-b910beaf02be	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	元気	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
cfc63b0a-5324-4336-9fb9-3360cd9b22b0	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	今日	noun	e5453351-57b0-437e-ae15-a89228f01437
4304a405-0f3a-458f-8fe8-af141100d01b	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	月	noun	e5453351-57b0-437e-ae15-a89228f01437
97203306-7620-46ce-8d19-d11b43ad912d	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	日	noun	e5453351-57b0-437e-ae15-a89228f01437
30dfae81-33d5-4c1b-b761-9e8b16600c6f	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	エピソード	noun	e5453351-57b0-437e-ae15-a89228f01437
59f76122-9153-4bfa-ab2a-8ba2383a86ce	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	日本	noun	e5453351-57b0-437e-ae15-a89228f01437
68048d25-d37f-4c85-844c-84d7fddf4b57	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	暖かい	adjective	e5453351-57b0-437e-ae15-a89228f01437
20445446-ea53-4ce4-916b-1d0f76ebb335	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	コート	noun	e5453351-57b0-437e-ae15-a89228f01437
5e3498a9-ba45-4c6e-bffa-eb90c1fcd6d2	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	寒い	adjective	e5453351-57b0-437e-ae15-a89228f01437
54c531ff-f852-4838-87e3-9e4ed60c5899	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	雪	noun	e5453351-57b0-437e-ae15-a89228f01437
f22b0fc5-ed30-42c7-acbc-3edae703db59	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	降る	verb	e5453351-57b0-437e-ae15-a89228f01437
173dda80-2323-47e3-8f08-3f1c3fdbf05d	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	スキー	noun	e5453351-57b0-437e-ae15-a89228f01437
5227b3c0-5678-4083-8361-6232d43e7c90	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	観光客	noun	e5453351-57b0-437e-ae15-a89228f01437
a6e8702c-78e4-40e2-bc2f-8f542da747cc	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	大変	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
db49f870-af31-46ee-85d8-428737a5a300	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	嬉しい	adjective	e5453351-57b0-437e-ae15-a89228f01437
dc03c87e-dfe4-4140-939a-f7b6f25942a7	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	ほめ言葉	noun	e5453351-57b0-437e-ae15-a89228f01437
ac875ecd-a010-4bba-9562-b56f1b6c6676	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	紹介	verb	e5453351-57b0-437e-ae15-a89228f01437
e2d81512-c8bd-4e3c-ab60-7fd9c9f37fe6	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	人	noun	e5453351-57b0-437e-ae15-a89228f01437
77a7d4e9-932b-44cb-95b4-1d3da15a0e0c	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	見た目	noun	e5453351-57b0-437e-ae15-a89228f01437
6ec36c0d-8451-4bcb-8419-c77f001b0093	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	女の子	noun	e5453351-57b0-437e-ae15-a89228f01437
ee7598bc-7618-4c6a-9a06-c2c7b70754cb	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	目	noun	e5453351-57b0-437e-ae15-a89228f01437
33183118-a4ce-4c60-a66e-cf0eab8a704c	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	大きい	adjective	e5453351-57b0-437e-ae15-a89228f01437
1ebd9ba9-9f2b-40ae-aa74-d5b89ec075f3	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	まつげ	noun	e5453351-57b0-437e-ae15-a89228f01437
2abdf754-7279-4ecc-955b-0e319c6ffe98	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	長い	adjective	e5453351-57b0-437e-ae15-a89228f01437
4541ea2f-49ba-4065-8669-9451bc6f90c2	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	きれい	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
9b8cc89f-08e6-490d-b4ea-817caac5bd5b	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	丸い	adjective	e5453351-57b0-437e-ae15-a89228f01437
78c16503-71a2-4849-b5d8-e649d7f19034	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	細い	adjective	e5453351-57b0-437e-ae15-a89228f01437
f82ef8e6-8536-479e-9b94-145e528c6fbe	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	一重	noun	e5453351-57b0-437e-ae15-a89228f01437
d958c4ea-9b7d-40cb-9729-8b5d1f61a93c	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	二重	noun	e5453351-57b0-437e-ae15-a89228f01437
7ee3d50c-378d-437c-a8b9-9700aec0ad08	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	線	noun	e5453351-57b0-437e-ae15-a89228f01437
8dec5fd5-ca62-4815-badc-213366a81e84	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	テープ	noun	e5453351-57b0-437e-ae15-a89228f01437
5e4d103d-e609-47d1-b513-642ce8006c9a	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	メイク	noun	e5453351-57b0-437e-ae15-a89228f01437
1954beb9-61c5-4d51-9a6b-33458c18d261	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	顔	noun	e5453351-57b0-437e-ae15-a89228f01437
b69d0eba-78fe-4e75-8e9a-056ff722582d	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	小さい	adjective	e5453351-57b0-437e-ae15-a89228f01437
7e1ee414-ad15-4a56-b3aa-10537eb70ee9	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	足	noun	e5453351-57b0-437e-ae15-a89228f01437
c9cd3950-c730-40f2-a3f3-de2270a9efdf	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	モデル	noun	e5453351-57b0-437e-ae15-a89228f01437
fe5ce691-92cc-45d3-8029-60321a083530	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	スタイル	noun	e5453351-57b0-437e-ae15-a89228f01437
963b4c01-52cd-4ffd-8114-c1f958f46879	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	理想的	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
21e72699-d4e5-47da-b3cf-bfbedfc47c88	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	イケメン	noun	e5453351-57b0-437e-ae15-a89228f01437
84da0fec-de4b-4a71-a7e8-63e484204585	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	かっこいい	adjective	e5453351-57b0-437e-ae15-a89228f01437
397899ed-d230-4256-9540-fa65ad8b0a6f	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	守る	verb	e5453351-57b0-437e-ae15-a89228f01437
664d3486-6d6a-4324-8a6e-eb61cb42d6a7	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	仕事	noun	e5453351-57b0-437e-ae15-a89228f01437
685245fc-9f75-4d09-a5ce-f3085cdebb3b	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	早い	adjective	e5453351-57b0-437e-ae15-a89228f01437
cbd7a471-621a-4b58-8a6c-8fcb37db56af	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	頭	noun	e5453351-57b0-437e-ae15-a89228f01437
11b80b75-7191-46bc-bbc5-658c72d75723	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	いい	adjective	e5453351-57b0-437e-ae15-a89228f01437
f1ae12bf-b418-47dd-aa4f-b7a6c682d2d6	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	さすが	adverb	e5453351-57b0-437e-ae15-a89228f01437
0aa528ae-e9f8-4574-bad5-ed5fad838bdf	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	頼りになる	verb phrase	e5453351-57b0-437e-ae15-a89228f01437
729d53f5-c633-4dfc-8a61-cf41ee24722a	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	センス	noun	e5453351-57b0-437e-ae15-a89228f01437
6d301a28-21bb-4ca8-bd02-db0c4aa686fa	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	ファッション	noun	e5453351-57b0-437e-ae15-a89228f01437
4dbdc3f2-a962-4933-85f5-33ca4a342919	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	おしゃれ	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
e5d0c7e1-849d-4af9-8290-f2b86556cadb	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	組み合わせる	verb	e5453351-57b0-437e-ae15-a89228f01437
3300abf3-98ad-4e41-beae-33854245e37f	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	新しい	adjective	e5453351-57b0-437e-ae15-a89228f01437
172e1d57-6744-40e0-8db9-b3f4f9daa8f7	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	冗談	noun	e5453351-57b0-437e-ae15-a89228f01437
6b701269-13a0-471b-851e-2183c8007091	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	楽しい	adjective	e5453351-57b0-437e-ae15-a89228f01437
1d64da94-b5ea-4bef-a222-6236bd3f8fc8	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	ありがとう	interjection/noun	e5453351-57b0-437e-ae15-a89228f01437
f9b01c21-0f4a-4acb-bd50-a810e620893a	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	嬉しい	adjective	e5453351-57b0-437e-ae15-a89228f01437
431bcdea-b156-4b7c-847c-511dae6c3e2b	2025-03-18 14:17:08.919999	2025-03-18 14:17:08.919999	素直	adjectival noun	e5453351-57b0-437e-ae15-a89228f01437
1cdc01e3-0e31-4e17-a29b-a3ad57d4e85f	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	皆さん	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
db299d17-5973-4d5b-b980-0233c7afb8a8	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	こんにちは	挨拶	f21efbd6-053c-4ae8-b35b-7e209aca8143
bcf7ea90-5599-46c1-b046-a7a0a2070bff	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	元気	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
25948eda-990c-451a-993f-cda45509c272	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	今日	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
6b2029c5-c58a-4118-87ce-a150a4f9c44c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	発表	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
182a3754-00f7-43a3-b8f9-2e3d58a4584e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	話	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
a643618e-25b7-4a85-bc51-87ee3b8cae41	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	したい	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
ace33130-77e3-4a93-b37e-4c04c03bee43	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	プレゼンテーション	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
7f5900f4-d844-499b-aa8a-bcffe43dc218	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	昨日	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
e22fe1dd-61b2-4b50-be0a-49c6d7b1305e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	私	代名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
3c959307-650b-4d0b-9ca6-54b457353d4a	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	大学	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
28d6fd07-177f-499f-9121-1910d0984bff	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	論文	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
687e70d3-248f-4b56-9e8b-0ad82aac9b4b	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	終わりました	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
89a8d743-5761-460c-a845-c01ef67261d8	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	最近	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
a69a92d8-f18a-40f9-9941-e8e505ab653c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	忙しかった	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
502f773c-325f-42ed-ab8f-9be807db6b65	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	九月	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
f164207e-3f8c-4dc7-a923-b3dc28c76429	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	卒業	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
7c984d36-ef8c-4d31-b551-da0af134a557	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	修士課程	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
f1c5c54b-5219-402c-a731-06bcd4d3368f	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	修士	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
78270fe3-4a0c-48a0-85b0-4fc37dee048d	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	最後	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
45e73122-1f2a-4de3-adfb-1e2a9bf8f56c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	四ヶ月	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
b8b24f1a-4fe7-4bc2-a41c-bd43045feb03	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	頑張って	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2abee215-fa38-4f9a-ab95-daadd74bd396	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	前	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
ae0fe782-9921-4b03-9f2b-8127112def34	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	全然	副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
eea6abce-1703-469a-a826-7530e23635b7	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	勉強	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
dd0a614c-277d-48db-846c-63725099d0c3	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	嬉しい	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
6e3fb47d-5b4e-4d04-ba18-f2fa6915592f	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	テンション	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
eb410b37-37ca-4b65-b3cd-7e6dcaaf8145	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	上がっている	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
4dfa0428-32c3-4f70-9762-f530ec3a3dc4	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	夏	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
701510e6-ee6a-4e97-b11e-951591e66e58	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	事	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
53d1fe0a-e6c6-4166-b306-da501bde0868	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	色々	副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2cff731b-ddf9-4b16-999a-98537c228c82	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	絵	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
447a4e16-da1a-4229-92e1-a90b6db5fdff	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	描く	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
e53552df-2755-4960-afd8-90e383e30020	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	好き	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
028b6e42-11b8-4ec3-9b55-0dedd0fb6344	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	部屋	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
8f6260e6-f458-4e55-90c1-d80225480d6e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	掃除	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
ac88fbe8-cf28-434f-afa5-f7a1ccca1718	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	上手	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
8922c4f7-08bb-48b9-b98a-37e3bd03246c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	理由	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
0ade8b5f-adaa-410d-bd0d-e5d5d8511573	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	練習	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
16ffda4f-61ba-47b0-9b0a-13f6a0f3182a	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	声	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
e4cb2e84-ed2a-4bd9-9242-ff2a80168356	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	大きい	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
db04e5c9-f65b-4a56-92e6-dba41393eec5	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	はっきり	副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
dc7b9317-75ce-4d7a-8333-f5d2604f5497	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	ゆっくり	副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
e64ba364-a482-4085-8c39-87373b93979e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	話す	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
29a3c957-7492-4ef6-875a-581f4b6c7b39	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	上手	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
148f6593-507e-40f9-9378-a8217add9559	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	やり方	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
0d1075bc-5bb0-49ec-bbf2-303d1929a137	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	知ってる	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
c195503e-587c-442c-bdf9-ce7583a3b2aa	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	役立つ	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
20dd8107-4806-4303-8a66-e8cdc761f608	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	得意	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
fd4f5023-b1a7-4cc8-9dda-0ea17699dad2	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	昔	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
ab3fc991-757b-4abe-b709-fcb1da9f935e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	前	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
3f0e5ee0-5db8-40ec-8580-19e079f862fc	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	みんな	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
3b9d12fa-4fec-434a-934c-b16bcedc5902	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	リーダー	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2c51ecdb-79f8-491f-a5e1-345fc4ae9d85	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	タイプ	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
44875390-916e-446d-a5b9-0ca9d530879b	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	時	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
df93440c-d84c-47e7-9615-d2c3e432ca6d	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	原稿	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
12d4d414-8814-4616-83f7-877f5af092bb	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	全部	副詞/名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
3f6fc291-c983-4ccb-bc61-fbbd43f57e40	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	紙	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2b1ab0aa-3e83-487b-acf2-df60501afd48	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	覚える	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
405586a1-76a0-4572-8f02-fd355059b363	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	何回	副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
1ed7a6cf-4c97-4a84-9b90-5d96f4dc5d40	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	言う	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
593e95a0-8281-4ea2-91f8-0dafde1bb902	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	昨日	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
b7715c31-1818-450c-970c-5e7f836a8735	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	Zoom	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
99b260c1-38ec-416d-9cb4-59dec09a19dd	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	実	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
821d418a-431a-46b3-8fa5-d346fb60ce38	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	パソコン	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
8786b52a-1959-4eea-8375-a4ec08937415	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	横	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
93e1ff4b-9e4a-4aa9-b9f6-86ef619266dd	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	タブレット	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
5cac35a4-6c4f-4cc4-a589-477340692b9e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	置く	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
202ca389-89a3-42e3-90a3-a05b65b23720	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	読む	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
d78e07d9-1aee-4220-bc68-5aa6d6b0c784	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	四回	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2061850b-077c-4fd2-8374-392946f95977	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	文章	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
0c4b2bfb-c937-4ac1-9a01-622140a4bbef	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	難しい	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
9bfad8c5-ebca-428c-8885-b111de41d087	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	大切	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
3745d81c-0054-4345-bcc3-fb4d1ba2ab8b	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	最後	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
905bccb3-64a7-47fd-b88c-a7f24a455b70	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	低い	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
9f8207ab-3b84-4d56-916a-4d799bbdf76e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	高い	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
5eb6796c-463f-451f-b944-2e79c9ae48d3	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	カッコよく	形容動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
75ec6421-d7b1-4c47-aeaa-8900acc64d7b	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	聞こえる	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
8c387da6-f051-447a-8645-53f5cf2527c0	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	間	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
70412726-76c1-4c2a-ac2c-7be10af4da4f	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	短い	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
77e58be1-0059-4f2a-86ba-4d682737471c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	長く	形容詞/動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
f9ec82b2-b828-4900-aa66-5c9ed8d013d8	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	聞く	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
34aa9401-18d9-4fd4-9114-6464eafda8ad	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	人	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
bc952b33-8b9c-4a86-b996-4a40f88297e0	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	目	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
998ffd7f-1fcf-495e-a53d-3ea31ede6994	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	耳	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
15a2a4bb-e9d7-4040-b479-a15e9eb29a93	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	理解する	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
5b671340-256b-4b28-82d6-236a5d4e930e	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	長い	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
4e864f1e-3df1-4749-ae33-174c149ce476	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	覚える	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
242b8937-1e6a-49c0-a9e9-417474789dd2	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	四年前	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
d54fe564-8cdc-47e0-a84a-65938d8d4d46	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	十分	形容動詞/副詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
a484d76a-bc83-426d-b6b4-e0826723e959	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	七分	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
05495a13-35fc-47d7-a923-8cec00cdd3bf	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	安心する	動詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
5891e80e-180d-4b72-b456-58ae7a91376f	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	怖い	形容詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
f4cbce11-cee3-40b4-981c-45b935ae840c	2025-03-21 12:54:55.539438	2025-03-21 12:54:55.539438	パワーポイント	名詞	f21efbd6-053c-4ae8-b35b-7e209aca8143
2f760798-9ef7-4baa-a4fd-9cad2b50a3bd	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	진심	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
5b284907-3a64-44e2-b87c-83fa256bbb85	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	돕다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
62f511f0-c6e3-4aae-ad73-d5b29c397243	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	음악	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
7849e84a-69dc-417b-a776-fe8f61ff286f	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	기회	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
f0ab0450-d85f-457d-9684-d57415fb5825	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	날씨	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
b6cec301-dca0-41f1-ac97-a0bb8b5f566f	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	좋다	형용사	e43e388c-a728-4b53-b4c3-49f8adaf3434
94175e83-fdcb-4eaf-ac7a-5a8cea994484	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	집	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
dc815c26-d04f-43d9-a601-806c7e998eb1	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	있다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
a9b4c07f-8ac4-4132-8a99-88b433a7f4a6	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	어딘가	대명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
f270ea46-f4c9-4001-b600-ec3f8da47ced	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	가다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
3cdda1e6-58f9-490e-9796-9361a589c6d9	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	아빠	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
1216495d-1ca3-416c-8ec3-6c1df15ad3d5	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	귀엽다	형용사	e43e388c-a728-4b53-b4c3-49f8adaf3434
d345c312-b8b6-4acf-b9b4-f7754d6d39aa	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	얼굴	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
a5157fd9-ed53-42fc-9fc8-96ca8929c79e	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	방구석	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
d417901c-fa7c-4894-b08c-4046a391b8ba	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	우리	대명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
9d3b65d7-bc68-4fc1-8197-cf7408fbd18a	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	놀다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
d192429e-863c-4b9c-be52-5eb05545342c	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	백화점	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
b0f1f38f-f2a3-40d5-aa67-c7d457f5a842	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	창문	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
c06e80b0-a543-482f-ae7b-2c5aade5beaa	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	비	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
bdd31c8c-0a3b-4600-885b-a0ff55a88012	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	오다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
87ab7c87-a1fc-496e-8be6-2da495948279	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	산	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
8a98fb3f-85a8-46b0-b8b5-9b4a90f42867	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	동물	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
721a5f17-ce1d-44cd-b0e2-7c3e28f86fb0	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	사람	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
979fc376-39d3-4e29-bf20-197ebe911ab4	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	많다	형용사	e43e388c-a728-4b53-b4c3-49f8adaf3434
2795f5c8-0803-4374-afbd-d2975d1f5ab8	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	고생	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
ab1c96bc-ef8c-4071-bfec-3d8009286148	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	최고	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
ae6c53dc-06bb-4d4c-96ec-5b33c5df52f1	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	심심하다	형용사	e43e388c-a728-4b53-b4c3-49f8adaf3434
34e18a68-624f-4344-baa4-d317f482b8a9	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	옷장	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
72fb6d6f-5a74-4088-90ff-41819de73df6	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	정리	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
67108ee8-bb32-499b-87c9-1057facebb3b	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	시작하다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
2e043a33-8701-4333-890f-97d2c0f46490	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	언니	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
a916f00c-ee0f-4253-8917-6d301a340e28	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	산책	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
2f94d8ac-3351-411b-bee0-bc4c326e7010	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	끝나다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
975c6d08-b995-4c5e-a49d-739d51550486	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	할아버지	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
3071466e-17e9-452b-ba4b-86a4961b87bd	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	카드	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
26a2c4d1-9124-47d5-a793-f04e2c4bab0c	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	게임	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
c0e66b82-f8d7-4237-ae69-2c4ab64326fa	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	엄마	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
96173ab8-9670-437c-a6a6-84c7b13c4666	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	보험	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
f496366f-98c9-48e9-8165-4a6474143715	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	지금	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
d018fd28-2f29-422b-8d8e-454f05df468e	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	혼자	부사	e43e388c-a728-4b53-b4c3-49f8adaf3434
b18d3871-813f-4e61-b25e-37cdbdb3b583	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	즐기다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
3d4ad83d-fb96-4457-8db4-1825807a102e	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	계획	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
0a59a071-5679-40b3-a54a-83bebcdc5b65	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	방	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
bb58ee32-0ade-454c-85dc-2721d8f72414	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	치우다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
9574b6e2-2fca-450c-b3f5-a0358f3cd67c	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	더럽다	형용사	e43e388c-a728-4b53-b4c3-49f8adaf3434
8e755bb6-6a59-4993-99b8-bd7e6f6e9475	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	친구	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
2e247617-78a2-4c7c-8cdb-a0e90db3abf2	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	장난감	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
3c90a236-cf2d-475d-8782-6cf3127777a8	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	잔소리	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
c8d92e2c-7ba0-4441-8a0f-8cbb802ca1a3	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	간장	명사	e43e388c-a728-4b53-b4c3-49f8adaf3434
848c74e5-e6d6-4489-babd-a57922b615f6	2025-03-21 15:49:51.444568	2025-03-21 15:49:51.444568	세우다	동사	e43e388c-a728-4b53-b4c3-49f8adaf3434
\.


--
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.workspaces (id, created_at, updated_at, title, members, created_by) FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: corodomo_admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: sub_tasks PK_0028874355f68f2ed21a89c2faf; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.sub_tasks
    ADD CONSTRAINT "PK_0028874355f68f2ed21a89c2faf" PRIMARY KEY (id);


--
-- Name: group_tasks PK_007abf7dea040e84026f4b66ca2; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.group_tasks
    ADD CONSTRAINT "PK_007abf7dea040e84026f4b66ca2" PRIMARY KEY (id);


--
-- Name: questions PK_08a6d4b0f49ff300bf3a0ca60ac; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY (id);


--
-- Name: workspaces PK_098656ae401f3e1a4586f47fd8e; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY (id);


--
-- Name: vocabularies PK_1f0c8d5539ccaf456ebf73cabb5; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT "PK_1f0c8d5539ccaf456ebf73cabb5" PRIMARY KEY (id);


--
-- Name: projects PK_6271df0a7aed1d6c0691ce6ac50; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


--
-- Name: task_comments PK_83b99b0b03db29d4cafcb579b77; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.task_comments
    ADD CONSTRAINT "PK_83b99b0b03db29d4cafcb579b77" PRIMARY KEY (id);


--
-- Name: folders PK_8578bd31b0e7f6d6c2480dbbca8; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: tasks PK_8d12ff38fcc62aaba2cab748772; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);


--
-- Name: subtitles PK_9ac397e12396227e34ba97af99e; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.subtitles
    ADD CONSTRAINT "PK_9ac397e12396227e34ba97af99e" PRIMARY KEY (id);


--
-- Name: lessons PK_9b9a8d455cac672d262d7275730; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY (id);


--
-- Name: lesson_comments PK_a1c4f2a0bc6e05767dd98f60e2a; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT "PK_a1c4f2a0bc6e05767dd98f60e2a" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: notes PK_af6206538ea96c4e77e9f400c3d; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY (id);


--
-- Name: quizzes PK_b24f0f7662cf6b3a0e7dba0a1b4; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY (id);


--
-- Name: exams PK_b43159ee3efa440952794b4f53e; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY (id);


--
-- Name: noted_vocabularies PK_c08ed5f8d9ba6b9f278762c4ee2; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.noted_vocabularies
    ADD CONSTRAINT "PK_c08ed5f8d9ba6b9f278762c4ee2" PRIMARY KEY (id);


--
-- Name: question_choices PK_d6d95fee6a251b392aeb9778cb0; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.question_choices
    ADD CONSTRAINT "PK_d6d95fee6a251b392aeb9778cb0" PRIMARY KEY (id);


--
-- Name: blogs PK_e113335f11c926da929a625f118; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY (id);


--
-- Name: songs PK_e504ce8ad2e291d3a1d8f1ea2f4; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY (id);


--
-- Name: exam_parts PK_e58d39a7a27df50f8d39ec3ffbf; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exam_parts
    ADD CONSTRAINT "PK_e58d39a7a27df50f8d39ec3ffbf" PRIMARY KEY (id);


--
-- Name: exam_sections PK_f0c07e5c86efbe4dee8bc3f6f2a; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exam_sections
    ADD CONSTRAINT "PK_f0c07e5c86efbe4dee8bc3f6f2a" PRIMARY KEY (id);


--
-- Name: lesson_notes lesson_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_notes
    ADD CONSTRAINT lesson_notes_pkey PRIMARY KEY (id);


--
-- Name: lesson_notes unique_user_lesson; Type: CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_notes
    ADD CONSTRAINT unique_user_lesson UNIQUE (created_by, lesson_id);


--
-- Name: blogs_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX blogs_pkey ON public.blogs USING btree (id);


--
-- Name: exam_parts_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX exam_parts_pkey ON public.exam_parts USING btree (id);


--
-- Name: exam_sections_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX exam_sections_pkey ON public.exam_sections USING btree (id);


--
-- Name: exams_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX exams_pkey ON public.exams USING btree (id);


--
-- Name: folers_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX folers_pkey ON public.folders USING btree (id);


--
-- Name: group_tasks_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX group_tasks_pkey ON public.group_tasks USING btree (id);


--
-- Name: index_lesson_notes_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX index_lesson_notes_pkey ON public.lesson_notes USING btree (id);


--
-- Name: lesson_comments_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX lesson_comments_pkey ON public.lesson_comments USING btree (id);


--
-- Name: lessons_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX lessons_pkey ON public.lessons USING btree (id);


--
-- Name: noted_vocabularies_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX noted_vocabularies_pkey ON public.noted_vocabularies USING btree (id);


--
-- Name: notes_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);


--
-- Name: projects_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);


--
-- Name: question_choices_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX question_choices_pkey ON public.question_choices USING btree (id);


--
-- Name: questions_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);


--
-- Name: quizzes_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX quizzes_pkey ON public.quizzes USING btree (id);


--
-- Name: songs_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX songs_pkey ON public.songs USING btree (id);


--
-- Name: sub_tasks_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX sub_tasks_pkey ON public.sub_tasks USING btree (id);


--
-- Name: subtitles_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX subtitles_pkey ON public.subtitles USING btree (id);


--
-- Name: task_comments_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX task_comments_pkey ON public.task_comments USING btree (id);


--
-- Name: tasks_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);


--
-- Name: users_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);


--
-- Name: vocabularies_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX vocabularies_pkey ON public.vocabularies USING btree (id);


--
-- Name: workspaces_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX workspaces_pkey ON public.workspaces USING btree (id);


--
-- Name: exams FK_092c1188aefcf72f818482268e0; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT "FK_092c1188aefcf72f818482268e0" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: task_comments FK_1b6e39fd81515b13b19d53528d0; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.task_comments
    ADD CONSTRAINT "FK_1b6e39fd81515b13b19d53528d0" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: noted_vocabularies FK_262efe93d167d0c0cb4ee5b2dc2; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.noted_vocabularies
    ADD CONSTRAINT "FK_262efe93d167d0c0cb4ee5b2dc2" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: lessons FK_3604df63dd8edf9d2c33c684146; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "FK_3604df63dd8edf9d2c33c684146" FOREIGN KEY (folder_id) REFERENCES public.folders(id);


--
-- Name: question_choices FK_3ee10095721b594eea07c1ef19e; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.question_choices
    ADD CONSTRAINT "FK_3ee10095721b594eea07c1ef19e" FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: group_tasks FK_5b603871e3883783c63767712c7; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.group_tasks
    ADD CONSTRAINT "FK_5b603871e3883783c63767712c7" FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: blogs FK_621c207260f600598802fc33044; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "FK_621c207260f600598802fc33044" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: workspaces FK_62422395ad425ffda42e4104056; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT "FK_62422395ad425ffda42e4104056" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: songs FK_8488de0813431c0ac005b6f1a6c; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT "FK_8488de0813431c0ac005b6f1a6c" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: tasks FK_964642f42701ca6465fb5943f64; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_964642f42701ca6465fb5943f64" FOREIGN KEY (group_task_id) REFERENCES public.group_tasks(id);


--
-- Name: projects FK_af78b8fc6857fe0a10d1bb1699e; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "FK_af78b8fc6857fe0a10d1bb1699e" FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id);


--
-- Name: notes FK_b86c5f2b5de1e7a3d2a428cfb55; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: questions FK_b963700a84537888c69c573f1b0; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_b963700a84537888c69c573f1b0" FOREIGN KEY (exam_part_id) REFERENCES public.exam_parts(id);


--
-- Name: lessons FK_b96adc7c3e06624edae3e0a01ae; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "FK_b96adc7c3e06624edae3e0a01ae" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: task_comments FK_ba9e465cfc707006e60aae59946; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.task_comments
    ADD CONSTRAINT "FK_ba9e465cfc707006e60aae59946" FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: sub_tasks FK_be4002db4cc6e2d20577f48ddf3; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.sub_tasks
    ADD CONSTRAINT "FK_be4002db4cc6e2d20577f48ddf3" FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: exam_parts FK_c35aa7e856f84899a1e9d7af53f; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exam_parts
    ADD CONSTRAINT "FK_c35aa7e856f84899a1e9d7af53f" FOREIGN KEY (exam_section_id) REFERENCES public.exam_sections(id);


--
-- Name: lesson_comments FK_d38aec8b48e8e106fd5d9a5f3e0; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT "FK_d38aec8b48e8e106fd5d9a5f3e0" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: exam_sections FK_dc264c5c55dc1c015bfdac3b428; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.exam_sections
    ADD CONSTRAINT "FK_dc264c5c55dc1c015bfdac3b428" FOREIGN KEY (exam_id) REFERENCES public.exams(id);


--
-- Name: group_tasks FK_dc2abf1e699d8b4d41bedfc6eeb; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.group_tasks
    ADD CONSTRAINT "FK_dc2abf1e699d8b4d41bedfc6eeb" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: folders FK_dc9b0a1095e7d48ca27df340faa; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT "FK_dc9b0a1095e7d48ca27df340faa" FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: quizzes fk_2cf4e4b5b533af8dc6b38d4fa9b; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT fk_2cf4e4b5b533af8dc6b38d4fa9b FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: noted_vocabularies fk_3c6ae7efc4a4824567835280d72; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.noted_vocabularies
    ADD CONSTRAINT fk_3c6ae7efc4a4824567835280d72 FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: vocabularies fk_61390ffac45b0ea0faf63d3a994; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT fk_61390ffac45b0ea0faf63d3a994 FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: subtitles fk_615e7ce0b38343085132d50f06e; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.subtitles
    ADD CONSTRAINT fk_615e7ce0b38343085132d50f06e FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lesson_comments fk_e120712049addd4650b9f2b2579; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT fk_e120712049addd4650b9f2b2579 FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lesson_notes fk_lesson; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_notes
    ADD CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lesson_notes fk_user; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_notes
    ADD CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

