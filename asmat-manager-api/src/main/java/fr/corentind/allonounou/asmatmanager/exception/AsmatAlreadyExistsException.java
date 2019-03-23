package fr.corentind.allonounou.asmatmanager.exception;


import fr.corentind.allonounou.asmatmanager.asmat.AsmatDto;

public class AsmatAlreadyExistsException extends Exception {

    public AsmatAlreadyExistsException(final AsmatDto asmat) {
        super(String.format("Une assistante maternelle avec le nom %s %s existe déjà.",
                asmat.getFirstName(),
                asmat.getLastName()));
    }
}
