package com.she.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller //变成链接对应的函数
@RequestMapping("/pk/")
public class IndexController {

    @RequestMapping("/index")
    public String index() {
        return "pk/index.html";
    }

}
