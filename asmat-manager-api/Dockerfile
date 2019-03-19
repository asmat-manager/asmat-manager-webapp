FROM openjdk:8-alpine
WORKDIR /app
COPY target/asmat-manager-api.jar .
ENV JWT_SECRET=""
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-Dspring.profiles.active=prod", "-Djwt.secret=$JWT_SECRET" ,"-jar", "asmat-manager-api.jar"]