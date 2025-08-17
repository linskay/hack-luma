package com.hahaton.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "djl")
public class DJLConfig {

    /**
     * Путь к кэшу моделей
     */
    private String modelCacheDir = ".djl/cache";
    
    /**
     * Максимальное количество моделей в памяти
     */
    private int maxModelsInMemory = 5;
    
    /**
     * Использовать GPU если доступен
     */
    private boolean useGpu = true;
    
    /**
     * Предпочтительный движок (pytorch, onnxruntime, tensorflow, mxnet)
     */
    private String preferredEngine = "pytorch";
    
    /**
     * Таймаут загрузки модели в секундах
     */
    private int modelLoadTimeout = 300;
    
    /**
     * Размер батча по умолчанию
     */
    private int defaultBatchSize = 1;
}
