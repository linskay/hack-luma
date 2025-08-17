package com.hahaton.web;

import jakarta.servlet.FilterChain;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class SpaWebFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        boolean isGet = "GET".equalsIgnoreCase(request.getMethod());
        boolean isApi = path.startsWith("/api");
        boolean looksLikeAsset = path.contains(".");
        boolean isDocs = path.startsWith("/swagger") || path.startsWith("/v3/api-docs") || path.startsWith("/actuator");

        if (isGet && !isApi && !isDocs && !looksLikeAsset && !"/index.html".equals(path)) {
            RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
            dispatcher.forward(request, response);
            return;
        }
        filterChain.doFilter(request, response);
    }
}
