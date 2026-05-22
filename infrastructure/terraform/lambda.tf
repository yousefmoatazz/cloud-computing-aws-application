# Lambda Function for Image Resizing

resource "aws_lambda_function" "image_resizer" {
  filename            = "lambda_function_payload.zip"
  function_name       = "${var.project_name}-image-resizer"
  role                = aws_iam_role.lambda_role.arn
  handler             = "index.handler"
  runtime             = "nodejs18.x"
  source_code_hash    = filebase64sha256("lambda_function_payload.zip")
  timeout             = 60
  memory_size         = 512

  environment {
    variables = {
      RESIZED_BUCKET_NAME = aws_s3_bucket.resized.id
    }
  }

  depends_on = [
    aws_iam_role.lambda_role,
    aws_iam_role_policy.lambda_s3_policy
  ]
}

# S3 Event Source for Lambda
resource "aws_s3_bucket_notification" "image_upload" {
  bucket = aws_s3_bucket.main.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.image_resizer.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "items/"
  }

  depends_on = [aws_lambda_permission.allow_s3]
}

# Lambda Permission for S3
resource "aws_lambda_permission" "allow_s3" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.image_resizer.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.main.arn
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${aws_lambda_function.image_resizer.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${var.project_name}-lambda-logs"
  }
}
