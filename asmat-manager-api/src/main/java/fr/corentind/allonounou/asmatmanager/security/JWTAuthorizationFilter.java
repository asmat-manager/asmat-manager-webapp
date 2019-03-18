package fr.corentind.allonounou.asmatmanager.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static fr.corentind.allonounou.asmatmanager.security.SecurityConstants.AUTHORIZATION_HEADER;
import static fr.corentind.allonounou.asmatmanager.security.SecurityConstants.BEARER_PREFIX;

@Slf4j
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private TokenService tokenService;

    JWTAuthorizationFilter(AuthenticationManager authenticationManager,
                           TokenService tokenService) {
        super(authenticationManager);
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        final String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);

        if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        final String token = authorizationHeader.replace(BEARER_PREFIX, "");
        try {
            final String username = tokenService.decodeForUsername(token);
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            new ArrayList<>()
                    )
            );
        } catch(JWTVerificationException e) {
            logger.debug("Failed to verify token.", e);
        }

        chain.doFilter(request, response);
    }
}
