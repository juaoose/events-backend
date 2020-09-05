CREATE TABLE public.EVENTS
(
    ID bigserial NOT NULL,
    TITLE character varying COLLATE pg_catalog."default" NOT NULL,
    ORGANIZER character varying COLLATE pg_catalog."default" NOT NULL,
    MAX_CAPACITY bigint,
    PRICE numeric(12, 2) NOT NULL,
    DATE timestamp with time zone NOT NULL,
    LOCATION character varying COLLATE pg_catalog."default",
    CONSTRAINT events_pkey PRIMARY KEY (ID)
)

TABLESPACE pg_default;

ALTER TABLE public.events
    OWNER to postgres;