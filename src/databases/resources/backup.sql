--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
    created_by uuid NOT NULL
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
    content character varying,
    created_by uuid NOT NULL,
    lesson_id uuid NOT NULL
);


ALTER TABLE public.lesson_comments OWNER TO corodomo_admin;

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
    minimap_id character varying NOT NULL,
    level integer,
    duration double precision DEFAULT '0'::double precision NOT NULL,
    watched_count integer DEFAULT 0 NOT NULL,
    watched_at timestamp without time zone,
    language character varying NOT NULL,
    folder_id uuid NOT NULL,
    created_by uuid NOT NULL
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

COPY public.blogs (id, created_at, updated_at, title, content, created_by) FROM stdin;
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
\.


--
-- Data for Name: group_tasks; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.group_tasks (id, created_at, updated_at, title, theme_color, created_by, project_id) FROM stdin;
\.


--
-- Data for Name: lesson_comments; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.lesson_comments (id, created_at, updated_at, content, created_by, lesson_id) FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.lessons (id, created_at, updated_at, youtube_url, thumbnail, full_subtitles, tag, minimap_id, level, duration, watched_count, watched_at, language, folder_id, created_by) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
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
fec6fc87-cc63-4fb8-9f06-4e51a5c209b5	2025-03-17 16:27:36.326072	2025-03-17 16:27:36.326072	david_ed@example.co	$2b$10$wMUAYVwF1.aFf1n9cqhgVu9cvXN.mqt0m4tSNQ.CCRI8ruhlKBQEm	learner	f
\.


--
-- Data for Name: vocabularies; Type: TABLE DATA; Schema: public; Owner: corodomo_admin
--

COPY public.vocabularies (id, created_at, updated_at, word, type, lesson_id) FROM stdin;
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
-- Name: lesson_comments_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX lesson_comments_pkey ON public.lesson_comments USING btree (id);


--
-- Name: lessons_pkey; Type: INDEX; Schema: public; Owner: corodomo_admin
--

CREATE UNIQUE INDEX lessons_pkey ON public.lessons USING btree (id);


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
-- Name: quizzes FK_2cf4e4b5b533af8dc6b38d4fa9b; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


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
-- Name: vocabularies FK_61390ffac45b0ea0faf63d3a994; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT "FK_61390ffac45b0ea0faf63d3a994" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: subtitles FK_615e7ce0b38343085132d50f06e; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.subtitles
    ADD CONSTRAINT "FK_615e7ce0b38343085132d50f06e" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


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
-- Name: lesson_comments FK_e120712049addd4650b9f2b2579; Type: FK CONSTRAINT; Schema: public; Owner: corodomo_admin
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT "FK_e120712049addd4650b9f2b2579" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- PostgreSQL database dump complete
--

