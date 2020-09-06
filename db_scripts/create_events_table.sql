-- Table: public.events

-- DROP TABLE public.events;

CREATE TABLE public.events
(
    id bigint NOT NULL DEFAULT nextval('events_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    organizer bigint NOT NULL,
    max_capacity bigint NOT NULL,
    price numeric(12,2) NOT NULL,
    date timestamp with time zone NOT NULL,
    location character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'https://cdn.vuetifyjs.com/images/cards/road.jpg'::character varying,
    description character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'Default description'::character varying,
    CONSTRAINT events_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.events
    OWNER to postgres;