package com.hahaton.kubetrainer.config;

import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KubeTrainerConfig {

    @Bean
    public KubernetesClient kubernetesClient() {
        // This creates a default client that will connect to the Kubernetes cluster
        // configured in the environment (e.g., from ~/.kube/config or service account)
        return new KubernetesClientBuilder().build();
    }
}
