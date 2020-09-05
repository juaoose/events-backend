
CREATE TABLE public.TICKETS
(
    ID bigserial NOT NULL,
    EVENT_ID bigint NOT NULL ,
    BUYER_USER_ID bigint NOT NULL,
    NAME character varying COLLATE pg_catalog."default" NOT NULL,
    BIRTH_DATE date NOT NULL,
    CONSTRAINT tickets_pkey PRIMARY KEY (ID),
    CONSTRAINT EVENT_ID FOREIGN KEY (EVENT_ID)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT USER_ID FOREIGN KEY (BUYER_USER_ID)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.tickets
    OWNER to postgres;