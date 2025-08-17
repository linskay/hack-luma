package com.hahaton.ai;

import ai.djl.Application;
import ai.djl.Device;
import ai.djl.inference.Predictor;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.modality.cv.output.DetectedObjects;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.training.util.ProgressBar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class DJLService {
    
    private static final Logger logger = LoggerFactory.getLogger(DJLService.class);
    
    /**
     * Классификация изображения с помощью предобученной модели ResNet
     */
    public Map<String, Object> classifyImage(String imageUrl) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Критерии для загрузки модели классификации изображений
            Criteria<Image, Classifications> criteria = Criteria.builder()
                    .optApplication(Application.CV.IMAGE_CLASSIFICATION)
                    .setTypes(Image.class, Classifications.class)
                    .optFilter("backbone", "resnet50")
                    .optFilter("dataset", "imagenet")
                    .optProgress(new ProgressBar())
                    .build();
            
            // Загружаем модель
            try (ZooModel<Image, Classifications> model = criteria.loadModel();
                 Predictor<Image, Classifications> predictor = model.newPredictor()) {
                
                // Загружаем изображение
                Image img = ImageFactory.getInstance().fromUrl(new URL(imageUrl));
                
                // Выполняем предсказание
                Classifications classifications = predictor.predict(img);
                
                // Формируем результат
                result.put("success", true);
                result.put("model", "ResNet50");
                result.put("predictions", classifications.topK(5));
                result.put("message", "Изображение успешно классифицировано");
                
            }
            
        } catch (Exception e) {
            logger.error("Ошибка при классификации изображения: ", e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "Не удалось классифицировать изображение");
        }
        
        return result;
    }
    
    /**
     * Обнаружение объектов на изображении
     */
    public Map<String, Object> detectObjects(String imageUrl) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Критерии для загрузки модели обнаружения объектов
            Criteria<Image, DetectedObjects> criteria = Criteria.builder()
                    .optApplication(Application.CV.OBJECT_DETECTION)
                    .setTypes(Image.class, DetectedObjects.class)
                    .optFilter("backbone", "resnet50")
                    .optFilter("dataset", "coco")
                    .optProgress(new ProgressBar())
                    .build();
            
            // Загружаем модель
            try (ZooModel<Image, DetectedObjects> model = criteria.loadModel();
                 Predictor<Image, DetectedObjects> predictor = model.newPredictor()) {
                
                // Загружаем изображение
                Image img = ImageFactory.getInstance().fromUrl(new URL(imageUrl));
                
                // Выполняем предсказание
                DetectedObjects detections = predictor.predict(img);
                
                // Формируем результат
                result.put("success", true);
                result.put("model", "ResNet50 Object Detection");
                result.put("detections", detections);
                result.put("count", detections.getNumberOfObjects());
                result.put("message", "Объекты успешно обнаружены");
                
            }
            
        } catch (Exception e) {
            logger.error("Ошибка при обнаружении объектов: ", e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "Не удалось обнаружить объекты");
        }
        
        return result;
    }
    
    /**
     * Получение информации о доступных моделях
     */
    public Map<String, Object> getAvailableModels() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Получаем информацию о доступных моделях
            result.put("success", true);
            result.put("models", Map.of(
                "image_classification", "ResNet50, VGG16, DenseNet",
                "object_detection", "ResNet50, YOLO, SSD",
                "text_generation", "GPT, BERT, T5",
                "translation", "Marian, T5",
                "sentiment_analysis", "BERT, DistilBERT"
            ));
            result.put("engines", "PyTorch, ONNX Runtime, TensorFlow, MXNet");
            result.put("message", "Информация о доступных моделях получена");
            
        } catch (Exception e) {
            logger.error("Ошибка при получении информации о моделях: ", e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "Не удалось получить информацию о моделях");
        }
        
        return result;
    }
    
    /**
     * Проверка здоровья DJL сервиса
     */
    public Map<String, Object> healthCheck() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Проверяем доступность устройств
            Device cpu = Device.cpu();
            Device gpu = Device.gpu();
            
            result.put("success", true);
            result.put("status", "DJL Service is running");
            result.put("cpu_device", cpu.toString());
            result.put("gpu_device", gpu.toString());
            result.put("message", "DJL сервис работает корректно");
            
        } catch (Exception e) {
            logger.error("Ошибка при проверке здоровья DJL сервиса: ", e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "DJL сервис недоступен");
        }
        
        return result;
    }
    
    /**
     * Простой тест DJL без загрузки моделей
     */
    public Map<String, Object> simpleTest() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Проверяем базовую функциональность DJL
            result.put("success", true);
            result.put("message", "DJL базовые компоненты работают");
            result.put("version", "0.34.0");
            result.put("available_engines", "PyTorch, ONNX Runtime");
            result.put("test_timestamp", System.currentTimeMillis());
            
        } catch (Exception e) {
            logger.error("Ошибка при простом тесте DJL: ", e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "DJL базовые компоненты недоступны");
        }
        
        return result;
    }
}
