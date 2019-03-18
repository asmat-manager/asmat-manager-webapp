package fr.corentind.allonounou.asmatmanager.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

import static fr.corentind.allonounou.asmatmanager.security.SecurityConstants.EXPIRATION_TIME_MILLI;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    String tokenFor(final String username) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MILLI))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    String decodeForUsername(final String token) throws JWTVerificationException {
        return JWT.require(Algorithm.HMAC512(secret.getBytes()))
                .build()
                .verify(token)
                .getSubject();
    }
}
